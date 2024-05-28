import React, { useEffect, useState } from 'react'
import NFTCard from '@/components/HotProducts/NFTCard'
import nfts from '@/data/nfts'
import { motion } from 'framer-motion'
import { supabase } from '../supabase'
function NFTCardsList() {
  const parentVariants = {
    hidden: {
      x: -100,
      opacity: 0,
    },
    show: {
      x: 0,
      opacity: 1,
      transition: { when: 'beforeChildren', staggerChildren: 0.1 },
    },
  }
  const childVariants = {
    hidden: {
      x: 100,
      opacity: 0,
    },
    show: {
      x: 0,
      opacity: 1,
      transition: { delay: 0.1 },
    },
  }


  const [data, setData] = useState([]);
  const [loading, setLoading] = useState([]);
  const getData = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("properties").select("*").eq("status", "Listed")
    // setData()
    console.log(data);
    setData(data)
    setLoading(false)
    return 1;
  }

  useEffect(() => {
    getData();
  }, [])

  // console.log(data[0].tokenID)
  return (
    <>
      {data.map((nft, idx) => {
        return (
          <motion.div key={idx}>
            <NFTCard
              key={nft.id}
              id={nft.tokenID}
              img={nfts[0].img}
              title={nft.description}
              price={nft.price}
              likes={nft.likes}
              sale={nft.sale}
              owner={nft.wallet}
            />
          </motion.div>
        )
      })}
    </>
  )
}

export default NFTCardsList
