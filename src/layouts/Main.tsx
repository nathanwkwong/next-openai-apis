import Head from 'next/head';
import { NextRouter, useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import Container from '@/components/Container';

interface MainProps {
    children: React.ReactNode;
    router: NextRouter;
}

const LayoutMain = ({ children, router }: MainProps) => {
    return (
        <div>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta
                    name="description"
                    content="Next OpenAI APIs experiments"
                />
                <meta name="author" content="Nathan Wong" />
                <meta name="twitter:title" content="Nathan Wong" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@nathanw" />
                <meta name="twitter:creator" content="@nathanw" />
                <meta name="twitter:image" content="_" />
                <meta property="og:site_name" content="Nathan Wong" />
                <meta name="og:title" content="Nathan Wong" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="_" />
                <title>Next OpenAI APIs experiments</title>
            </Head>

            <Navbar path={router.asPath} />

            <Container>{children}</Container>
        </div>
    );
};

export default LayoutMain;
