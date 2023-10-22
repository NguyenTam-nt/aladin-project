import React from "react";
import { useTranslation } from "react-i18next";
import { TextInputProps, View, ViewStyle, StyleSheet, TextInput } from "react-native";
import TextTranslate from "../TextTranslate";
import { defaultColors } from "@configs";
import { TextCustom } from "../Text";
import TextError from "../TextError";

type Props = {
    textTitle: string;
    textPlanholder: string;
    containerStyle?: ViewStyle[] | ViewStyle;
    textarea?: boolean;
    message?: string;
    option?: { [key: string]: any };
    maxLength?: number;
    renderLeft?: () => React.ReactElement;
    isRequire?: boolean
} & TextInputProps;
const TextInputComponent = (props: Props) => {
    const {
        textPlanholder,
        textTitle,
        textarea = false,
        message,
        option,
        renderLeft,
        isRequire = true
    } = props;
    const { t } = useTranslation();
    return (
        <View style={{ position: 'relative' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                <TextTranslate
                    fontSize={16}
                    weight="700"
                    textAlign="justify"
                    color={defaultColors.c_0000}
                    text={textTitle}
                />
                {
                    isRequire && (
                        <TextCustom
                            fontSize={16}
                            weight="700"
                            color={defaultColors.text_EE0000}>
                            *
                        </TextCustom>
                    )
                }
            </View>
            <View style={styles(textarea).styleInput}>
                {renderLeft && renderLeft()}
                <TextInput
                    style={styles().inputText}
                    placeholder={t(`${textPlanholder}`)}
                    {...props}
                />
            </View>
            <TextError message={message ?? ''} option={option} />
        </View>
    );
};

export default TextInputComponent;

const styles = (textarea?: boolean) =>
    StyleSheet.create({
        styleInput: {
            marginTop: 8,
            flexDirection: 'row',
            borderColor: defaultColors.text_C4C4C4,
            borderWidth: 1,
            borderRadius: textarea ? 20 : 50,
            overflow: 'hidden',
            alignItems: 'center',
            height: textarea ? 80 : 40,
        },
        inputText: {
            flex: 1,
            height: '100%',
            paddingLeft: 12,
        },
    });
