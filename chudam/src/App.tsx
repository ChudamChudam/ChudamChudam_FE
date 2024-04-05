import { createBrowserRouter, RouterProvider, LoaderFunction, ActionFunction } from 'react-router-dom'
/**
*@title 넥스트 처럼 파일 이름으로 라우팅 하기
*@description 
인덱스 라우팅
src/pages/index.tsx => '', '/'
src/pages/dashboard/index.tsx => '/dashboard'
중첩 라우팅
src/pages/dashboard/analytics.tsx => '/dashboard/analytics'
동적 라우팅
src/pages/dashboard/$id.tsx => '/dashboard/abc','/dashboard/123'
*/
interface RouteCommon {
    loader?: LoaderFunction
    action?: ActionFunction
    ErrorBoundary?: React.ComponentType<any>
}

interface IRoute extends RouteCommon {
    path: string
    Element: React.ComponentType<any>
}

interface Pages {
    [key: string]: {
        default: React.ComponentType<any>
    } & RouteCommon
}

const pages: Pages = import.meta.glob('./pages/**/*.tsx', { eager: true })
const routes: IRoute[] = []
for (const path of Object.keys(pages)) {
    const fileName = path.match(/\.\/pages\/(.*)\.tsx$/)?.[1]
    if (!fileName) {
        continue
    }
    //동적 라우팅 정적 라우팅
    const normalizedPathName = fileName.includes('$') ? fileName.replace('$', ':') : fileName.replace(/\/index/, '')

    routes.push({
        path: fileName === 'index' ? '/' : `/${normalizedPathName.toLowerCase()}`,
        Element: pages[path].default,
        loader: pages[path]?.loader as LoaderFunction | undefined,
        action: pages[path]?.action as ActionFunction | undefined,
        ErrorBoundary: pages[path]?.ErrorBoundary,
    })
}

const router = createBrowserRouter(
    routes.map(({ Element, ErrorBoundary, ...rest }) => ({
        ...rest,
        element: <Element />,
        ...(ErrorBoundary && { errorElement: <ErrorBoundary /> }),
    })),
)

const App = () => {
    return <RouterProvider router={router} />
}

export default App
