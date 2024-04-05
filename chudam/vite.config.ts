import { defineConfig, type UserConfig } from 'vite'
import react from '@vitejs/plugin-react'

// import dns from 'dns'

/**
 * Vite Configure
 * @see {@link https://vitejs.dev/config/}
 */
//
// dns.setDefaultResultOrder('verbatim')

export default defineConfig(async ({ command, mode }): Promise<UserConfig> => {
    const config: UserConfig = {
        esbuild: {
            drop: [],
            // drop: mode === 'production' ? ['console', 'debugger'] : [],
        },
        base: '/',
        build: {
            outDir: mode === 'production' ? 'dist' : 'beta',
            assetsDir: 'assets',
            target: 'esnext',
            minify: 'esbuild',
            chunkSizeWarningLimit: 1000, // 청크 크기 경고 제한값 (기본500kb - vite에서는 500kb를 선호한다.)
            // rollup 옵션설정 (vite사이트(https://ko.vitejs.dev/config/build-options.html#build-rollupoptions) 및 rollup사이트 참조(https://rollupjs.org/configuration-options/))
            rollupOptions: {
                // 경고(오류가 아닌 경고) 무시
                onwarn(warning, warn) {
                    if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
                        return
                    }
                    warn(warning)
                },
                output: {
                    manualChunks(id) {
                        if (id.includes('node_modules')) {
                            return id.toString().split('node_modules/')[1].split('/')[0].toString()
                        }
                    },
                },
            },
        },
        css: {
            devSourcemap: true,
        },
        // plugins: [react(), basicSsl()],
        plugins: [react()],
        define: { 'process.env': {} },
        resolve: {
            alias: [
                { find: '@', replacement: '/src' },
                { find: '@library', replacement: '/src/library' },
                { find: '@@types', replacement: '/src/types' },
                { find: '@components', replacement: '/src/components' },
                { find: '@images', replacement: '/src/images' },
                { find: '@pages', replacement: '/src/pages' },
                { find: '@config', replacement: '/src/config' },
                { find: '@api', replacement: '/src/api' },
                { find: '@hooks', replacement: '/src/hooks' },
            ],
        },
    }
    return config
})
