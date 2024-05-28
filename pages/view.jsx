import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Header/Navbar";
import Spinner from "@/components/Spinner";
import { supabase } from "@/components/supabase";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
// import { useSearchParams,useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function view(props) {
    // const searchParams = useParams()
    const { address, isConnected } = useWeb3ModalAccount()
    // console.log(useSearchParams.get('tokenId'))
    

    const [data0, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const getData = async () => {
        setLoading(true);
        const { data, error } = await supabase.from("properties").select("*").eq("id", "17")
        // setData()
        console.log(data);
        setData(data)
        setLoading(false)
        return 1;

    }
    // getData()
    useEffect(() => {
        getData()
    }, [])
    // console.log(data0[0].name)
    if (loading) return <Spinner />
    return (
        <>
            <Navbar />
            <div className="h-screen"></div>
            {/* <h1 className="text-slate-100">Name: {data0[0].name }</h1> */}

             <button onClick={()=>{getData()}}>Get</button>
            <Footer />
        </>
    );
}