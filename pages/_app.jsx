import "@/styles/globals.css";
import { MoralisProvider } from "react-moralis";
import { Web3Modal } from "../context/web3modal";

export const metadata = {
    title: "Web3Modal",
    description: "Web3Modal Example",
};

function MyApp({ Component, pageProps }) {
    return (
        <MoralisProvider initializeOnMount={false}>
            <Web3Modal>
                <Component {...pageProps} />
            </Web3Modal>
        </MoralisProvider>
    )
}

export default MyApp;