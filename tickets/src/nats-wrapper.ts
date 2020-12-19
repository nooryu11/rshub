import nats, {Stan} from 'node-nats-streaming'


class NatWrapper {
    private _client?: Stan


    get client(){
        if(!this._client) throw new Error( "Cannot access NAT client before connecting to it")
        console.log("couldnt connect")
        return this._client;
    }
    connect(clusterId:string,clientId:string,url:string){
        this._client! = nats.connect(clusterId,clientId,{url}) 
        return new Promise<Stan>((resolve,reject)=>{
            this._client!.on('connect',()=>{
                console.log("connected to NATS....")
                resolve()
            })
            this._client!.on('error',(err)=>{
               reject(err)
            })
        })
    }
}

export const natsWrapper = new NatWrapper()