import { HomeStyled } from "../styles/HomeStyled";
import { IndieStyled } from "../styles/IndieStyled";
import Navbar from "./Navbar";
import AceEditor from "react-ace";
import { Button } from "../styles/ButtonStyled";
import { Icon } from '@iconify/react';
import { useParams } from "react-router-dom";
import colorGradients from "../data/data.json";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/ext-language_tools"

const IndieColor = () => {

    const [gradients, setGradients] = useState([]);
    const [loading, setIsLoading] = useState(false)
    
    useEffect(() => {
        setGradients(colorGradients)
        setIsLoading(false)
    }, [])

    const { name } = useParams();

    const copyCode = (color) => {

        const colorCode = `background: ${color[0]};\nbackground: -webkit-linear-gradient(to left, ${color[0]}, ${color[1]} ${color[2] ? color[2] : ""}); \nbackground: linear-gradient(to left, ${color[0]}, ${color[1]} ${color[2] ? color[2] : ""});`;
        navigator.clipboard.writeText(colorCode);
        toast.success("Copied to clipboard!"); // toaster

    } 

    return ( 
        <>
        <HomeStyled>

            <Navbar />
            <IndieStyled>
                {
                    !loading && gradients.length !== 0 ? gradients.map((gradient) => {
                        if(gradient.name === name){
                            return <div className="wrapper">  
                            <div 
                            style={{
                                background: `linear-gradient(to left, ${gradient.colors[0]}, ${gradient.colors[1]})`,
                            }}
                            className="gradient">
                                <div className="code_wrapper">
                                    {
                                        gradient.colors.map((color) => {
                                           return <span style={{color:`${color}`, padding:"7px"}}>{color}</span>
                                        })
                                    }
                                    <div className="code">
                                    <AceEditor
                                        mode="css"
                                        theme="solarized_dark"
                                        name="UNIQUE_ID_OF_DIV"
                                        editorProps={{ $blockScrolling: true }}
                                        setOptions={{
                                        enableBasicAutocompletion: false,
                                        enableLiveAutocompletion: false,
                                        enableSnippets: false,
                                        fontSize:"20px",
                                        }}
                                        width="50rem"
                                        height="180px"
                                        value={`background: ${gradient.colors[0]}\nbackground: -webkit-linear-gradient(to left, ${gradient.colors[0]} ${gradient.colors[1]}  ${ gradient.colors[2] ? gradient.colors[2] : ""}) \nbackground: linear-gradient(to left, ${gradient.colors[0]} ${gradient.colors[1]} ${ gradient.colors[2] ? gradient.colors[2] : "" })`}
                                        className="editor"
                                    />
                                    </div>
                                    <div className="actions">
                                        <Button onClick={() => copyCode(gradient.colors)} width="170px" color="black" background="#DCDEE2">
                                            Copy code <Icon icon="bi:code-slash" inline={true} width="20" height="20" />
                                        </Button>
                                        <Button width="170px"  color="black" background="#DCDEE2" >
                                            Bookmark <Icon icon="carbon:bookmark-add" inline={true} width="20" height="20" />
                                        </Button>
                                        <Button width="170px"  color="black" background="#DCDEE2">
                                            Download <Icon icon="carbon:download" width="20" height="20" inline={true} />
                                        </Button>
                                    </div>
                                </div>
                            </div>
            
                        </div>
                        }
                    }) : ""
                }
  
            </IndieStyled>

        </HomeStyled>
        </>
     );
}
 
export default IndieColor;