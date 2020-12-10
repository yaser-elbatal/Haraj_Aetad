import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Animated, KeyboardAvoidingView, ActivityIndicator } from "react-native";
import {
    Container,
    Content,
    Header,
    Left,
    Body,
    Title,
    Toast,
    Form,
    Item,
    Input,
} from 'native-base'
import styles from '../../assets/style';
import i18n from "../../locale/i18n";
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker';
import { useSelector, useDispatch } from 'react-redux';
import { addPhotoAds } from "../actions";
import Loading from "../components/Loading";
import { addTransfer } from "../actions";

function UploadPhotoAdv({ navigation, route }) {

    const lang = useSelector(state => state.lang.lang);
    const auth = useSelector(state => state.auth);
    const token = useSelector(state => state.auth.user ? state.auth.user.token : null);
    const [url, setUrl] = useState('');
    const [urlStatus, setUrlStatus] = useState(0);
    const [urlValue] = useState(new Animated.Value(0));
    const [loader, setLoader] = useState(false);
    const [userImage, setUserImage] = useState('');
    const [base64, setBase64] = useState('');
    const dispatch = useDispatch();

    function activeInput(type) {

        if (type === 'url' || url !== '') {
            setUrlStatus(1);
            const toValue = -25;
            Animated.spring(
                urlValue,
                {
                    toValue: toValue,
                    velocity: 3,
                    tension: 2,
                    friction: 8,
                }
            ).start();
        }

    }

    function unActiveInput(type) {

        if (type === 'url' && url === '') {
            setUrlStatus(0);
            const toValue = 0;
            Animated.spring(
                urlValue,
                {
                    toValue: toValue,
                    velocity: 3,
                    tension: 2,
                    friction: 8,
                }
            ).start();
        }

    }

    const validate = () => {

        let isError = false;
        let msg = '';

        if (base64 === '') {
            isError = true;
            msg = i18n.t('chphAdv');
        } else if (url.length <= 0) {
            isError = true;
            msg = i18n.t('chliAdv');
        }

        if (msg !== '') {
            Toast.show({
                text: msg,
                type: "danger",
                duration: 3000,
                textStyle: {
                    color: "white",
                    fontFamily: 'FairuzBlack',
                    textAlign: 'center',
                }
            });
        }
        return isError;


    };

    const askPermissionsAsync = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);

    };

    const _pickImage = async (type) => {

        askPermissionsAsync();

        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            base64: true
        });

        let localUri = result.uri;
        let filename = localUri.split('/').pop();

        if (!result.cancelled) {
            if (type === 'userImg') {
                setUserImage(result.uri);
                setBase64(result.base64);
            }
        }
    };

    function onSubmit() {
        const err = validate();

        if (!err) {
            setLoader(true);
            const data = { token, base64, url, lang };
            dispatch(addPhotoAds(data, navigation)).then(() => setLoader(false).catch(() => setLoader(false)));
        }

    }

    function renderLoader() {
        if (loader) {
            return (
                <Loading />
            );
        }
    }

    let image = userImage;

    return (
        <Container style={[styles.bg_White]}>

            {renderLoader()}

            <Header style={[styles.headerView, styles.bg_default, styles.Width_100, styles.paddingHorizontal_15]}>
                <Left style={[styles.leftIcon,]}>
                    <TouchableOpacity style={[styles.Button]} transparent onPress={() => navigation.goBack()}>
                        <Image
                            style={[styles.width_25, styles.height_25]}
                            source={lang !== 'ar' || lang == null ? require('../../assets/image/left.png') : require('../../assets/image/right.png')}
                        />
                    </TouchableOpacity>
                </Left>
                <Body style={[styles.bodyText]}>
                    <Title style={[styles.FairuzBold, styles.text_White, styles.textSize_18,]}>
                        {i18n.t('pho')}
                    </Title>
                </Body>
            </Header>

            <Content contentContainerStyle={styles.bgFullWidth}>

                <View style={[styles.position_R, styles.flexCenter, styles.Width_100, styles.zIndex]}>

                    <KeyboardAvoidingView behavior={'padding'} style={[styles.Width_90, styles.paddingHorizontal_10]}>
                        <Form style={[styles.flexCenter, styles.Width_100, styles.marginVertical_20]}>

                            <View style={[styles.marginVertical_30, styles.position_R]}>
                                <TouchableOpacity onPress={() => _pickImage('userImg')} style={[styles.overHidden, styles.flexCenter, styles.position_R]}>
                                    {
                                        image !== '' ?
                                            <Image source={{ uri: image }} style={[styles.width_80, styles.height_80, styles.Radius_10]} />
                                            :
                                            <Image resizeMode={'contain'} source={require('../../assets/image/picture.png')} style={[styles.width_70, styles.height_70,]} />
                                    }
                                </TouchableOpacity>
                                <Text style={[styles.FairuzBold, styles.textSize_14, styles.text_bold_gray, styles.textCenter, styles.marginTop_20]}>
                                    {i18n.translate('phAdv')}
                                </Text>
                            </View>

                            <View style={[styles.position_R, styles.height_70, styles.flexCenter]}>
                                <Animated.View style={[styles.position_A, styles.left_10, { transform: [{ translateY: urlValue }] }, (urlStatus === 1 ? styles.inActB : styles.unActB)]}>
                                    <Text style={[styles.FairuzNormal, styles.textPlatform14, styles.textDir, (urlStatus === 1 ? styles.text_orange : styles.text_default)]}>
                                        {i18n.translate('liAdv')}
                                    </Text>
                                </Animated.View>
                                <Item style={[styles.item, styles.position_R]}>
                                    <Input
                                        style={[styles.input, styles.height_50, styles.text_default, styles.Radius_5, styles.Border, (urlStatus === 1 ? styles.border_orange : styles.border_light_gray)]}
                                        onChangeText={(url) => setUrl(url)}
                                        onBlur={() => unActiveInput('url')}
                                        onFocus={() => activeInput('url')}
                                    />
                                </Item>
                            </View>

                            <TouchableOpacity
                                style={[styles.bg_orange, styles.marginVertical_30, styles.width_200, styles.height_50, styles.flexCenter, styles.Radius_10]}
                                onPress={() => onSubmit()}
                            >
                                <Text style={[styles.FairuzBold, styles.textSize_15, styles.text_default]}>
                                    {i18n.t('confirm')}
                                </Text>
                            </TouchableOpacity>

                        </Form>
                    </KeyboardAvoidingView>
                </View>

            </Content>

        </Container>
    );
}

export default UploadPhotoAdv;
