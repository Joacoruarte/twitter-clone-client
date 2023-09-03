/** @type {import('next').NextConfig} */
const nextConfig = {
    // sassOptions: {
    //     includePaths: [path.join(__dirname, 'styles')],
    //     prependData: `
    //         $color-primary: rgb(231, 233, 234);
    //     `,
    // }
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'firebasestorage.googleapis.com',
            port: '',
          },
        ],
      },
};

module.exports = nextConfig;
