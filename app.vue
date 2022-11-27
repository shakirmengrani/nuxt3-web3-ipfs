<template>
  <div>
    <form @submit.prevent="onSubmit">
      <input type="text" v-model="title" />
      <input type="file" @change="onUpload" />
      <input type="submit" value="Upload" />
    </form>
  </div>
</template>
<script>
import * as IPFS from 'ipfs-http-client'
import { connectWallet } from './web3'
import {Buffer} from 'buffer'
export default {
  async setup(){
    const ipfs_client = IPFS.create({url: "http://127.0.0.1:5001/api/v0"})
    const web3Wallet = await connectWallet()
    return {ipfs_client, web3Wallet}
  },
  data(){
    return {
      title: "",
      imageBuffer: null
    }
  },
  created(){

  },
  methods: {
    async onSubmit(){
      if(this.imageBuffer && this.title){
        const fileHash  = await this.ipfs_client.add(this.imageBuffer)
        const textHash =  await this.ipfs_client.add(this.title)
        this.web3Wallet.contract.methods.sendHash(fileHash.path, textHash.path)
        .send({from: this.web3Wallet.accounts[0]}, (error, trx) => {
          console.log("error", error)
          if(trx !== undefined){
            alert("Storing on Ethereum");
            this.web3Wallet.contract.once("NewPost", {from: this.web3Wallet.accounts[0]}, () => {
              alert("Stored successfull")
            })
          }
        })
      }
      
    },
    onUpload(e){
      const reader = new FileReader();
      if(typeof e !== undefined){
        reader.readAsArrayBuffer(e.target.files[0])
        reader.onload = () => {
          this.imageBuffer = Buffer.from(reader.result)
        }
      }else{
        this.imageBuffer = ''
      }
    },
    
  }
}
</script>