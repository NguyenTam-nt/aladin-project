import { useEffect, useState } from "react";

type Props = {
  ggMapLink?: string 
  width: number | string;
  height: number | string;
};
  
export default function Map({ 
  ggMapLink , 
  width, 
  height 
}: Props) {

  const [ggMapEmbed, setggMapEmbed] = useState("")

  useEffect(() => {
    let temp = ggMapLink?.slice(ggMapLink.indexOf("src=\"") + "src=\"".length)
    temp = temp?.slice(0, temp.indexOf("\""))
    setggMapEmbed(temp || "");
  }, [ggMapLink])
  
  
  return (      
    <iframe
    src={ggMapEmbed}
      width={width}
      height={height}
    ></iframe>
  );
}
