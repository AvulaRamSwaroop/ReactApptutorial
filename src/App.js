import { useState } from "react";

function Button({val,clic}){
  return (
    <button style={{margin:"12px",height:"36px",
    display:"inline-block",width: "36px"}} className="square"onClick={clic}>{val}</button>
  )
};

  function App({squ,pl}) {

  // const [squ,setSqu] = useState(Array(9).fill(null));
const [isx,setIsx] = useState(true);

  function cli(i){
    if(squ[i] || out){
      return;
    }
    
    const nex = squ.slice();
    nex[i] =isx?  'X': "O";
    setIsx(!isx);
    pl(nex);
  }


const out = dec(squ);
let disc;
if(out){
disc="Winner: "+out;
}else{
  disc="Next Move: "+(isx?"X":"O");
}       



  return (
     <div style={{  
       display: "flex",
       position:"fixed",
       flexDirection: "column",
       alignItems: "center",
       justifyContent : "center"

     }}>
      <h1>{disc}</h1>
       <div style={{margin:"5px", alignItems: "center",
       justifyContent : "center"}}> 
        <Button val={squ[0]} clic={()=> cli(0)}/>
        <Button val={squ[1]} clic={()=> cli(1)}/>
         <Button val={squ[2]} clic={ ()=> cli(2)}/>
       </div>
       <div  style={{margin:"5px"}}>
       <Button val={squ[3]} clic={() => cli(3)}/>
       <Button val={squ[4]} clic={() => cli(4)}/>
       <Button val={squ[5]} clic={() => cli(5)}/>
       </div>
      <div style={{margin:"5px"}}>
       <Button val={squ[6]} clic={() => cli(6)}/>
        <Button val={squ[7]} clic={() => cli(7)}/>
        <Button val={squ[8]} clic={() => cli(8)}/>
       </div>
      </div>
  );
};

 function dec(squ){
const lists = [
  [0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]
]

for(let i=0;i<lists.length;i++){
  const [a,b,c] = lists[i];
  if(squ[a]&& squ[a] === squ[b] && squ[a] === squ[c]){
    return squ[a];
  }
}return null;

 }

 export default function Game(){
const [history,setHistory]  = useState([Array(9).fill(null)])
const [current,setCurrent] = useState(0);
const curresqu = history[current];
function play(nex){
  const newh = [...history.slice(0,current+1),nex];
setHistory(newh);
setCurrent(newh.length-1);
}

function jump(mo){
  setCurrent(mo);
}

  const moves  = history.map((squ,ind) => {
let stat;
if(ind>0){
  stat= "# Go to MOve: "+ind;
}else{
  stat="Got to start";
}


    return(
      <li>
        <button onClick={() => {jump(ind)}}>{stat}</button>
      </li>
    )
  })


  return (
    <div style={{display:"flex",
      justifyContent: "space-between",
      padding: "40px"
    }}>
    <div  >
     <App pl={play} squ={curresqu}/>
    </div>
    <div style={{
      paddingRight: "30px"
    }}>
 <h1>History</h1>
 <ol>{moves}</ol>
    </div>
    
    
    </div>
  )
 }