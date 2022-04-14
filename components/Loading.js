import {Circle} from 'better-react-spinkit'; 

const Loading = () => {
    return (
        <center style={{display:"grid", placeItems:"center", height:"100vh"}}>
            <div>
                <img
                    src="https://logowik.com/content/uploads/images/829_whatsapp_symbol.jpg"
                    style={{marginBottom: 10}}
                    height= {200}  
                />
                <Circle color="#3CBC28" size={60}/>
            </div>
        </center>
    )
};

export default Loading;