import { useWindowDimensions } from "react-native"
import RenderHTML, { MixedStyleRecord } from "react-native-render-html"
import React  from "react"

export interface HtmlProps {
  content?: string
  tagsStyles?: MixedStyleRecord
}

export const Html = (props: HtmlProps) => {
  const {width} = useWindowDimensions()
  return <RenderHTML contentWidth={width} source={{ html: props.content || '' }} tagsStyles={props.tagsStyles ?? {}} />
}