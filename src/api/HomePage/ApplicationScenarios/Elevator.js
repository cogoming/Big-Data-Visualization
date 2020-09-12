import axios from "axios";

let url ='http://183.239.241.108:50002'

export function ElevatorRequest(obj){
    let reqUrl=url+'/get'
    axios.get(reqUrl).then((res)=>{

        obj.direction=res.data.direction

        var tep=obj.elevatorOption.series[1].axisLine.lineStyle.color[0]
        tep[0]=parseFloat(res.data.elefloor/4)
        obj.elevatorOption.series[1].data[0].value=res.data.elefloor
        //
        // var tep1=obj.userOption.series[1].axisLine.lineStyle.color[0]
        // tep1[0]=parseFloat(res.data.userfloor/4)
        // obj.userOption.series[1].data[0].value=res.data.usrfloor
    })
}

