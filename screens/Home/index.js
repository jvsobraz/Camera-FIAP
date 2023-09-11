/* Com o App.js pronto podemos ir para o nosso index da Home onde importaremos: */

import { useEffect, useState } from "react";
import { View, TouchableOpacity, Text } from 'react-native';

import { Camera, CameraType } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';

import neutralImg from '../../assets/neutral.png';
import smillingImg from '../../assets/smilling.png';
import winkingImg from '../../assets/winking.png';

import { styles } from './styles';

/* Depois de importado, podemos iniciar criando nossos estados, os quais serão
explicados um por um: */

const [faceDetected, setFaceDetected] = useState(false);
const [permission, requestPermission] = Camera.useCameraPermissions();
const [emoji, setEmoji] = useState(neutralImg);
const [type, setType] = useState(CameraType.back);

const faceValues = useSharedValue({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
})

/* Após isso teremos a função de detectar o rosto, que irá detectar nosso rosto e
movimento, setar a imagem a ser exibida e fazer a animação para acompanhar o rosto: */

function handleFacesDetected({ faces }) {
    const face = faces[0];

    if (face) {
        const { size, origin } = face.bounds;

        faceValues.value = {
            width: size.width,
            height: size.height,
            x: origin.x,
            y: origin.y,
        }

        setFaceDetected(true);

        if (face.smillingProbability > 0.5) {
            setEmoji(smillingImg);
        } else if (face.leftEyeOpenProbability < 0.5 && face.rightEyeOpenProbability > 0.5) {
            setEmoji(winkingImg);
        } else {
            setEmoji(neutralImg);
        }

    } else {
        setFaceDetected(false);
    }
}

/* Também teremos nossa variável que vai controlar a nossa animação em real time: */

const animatedStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    zIndex: 1,
    width: faceValues.value.width,
    height: faceValues.value.height,
    transform: [
        { translateX: faceValues.value.x },
        { translateY: faceValues.value.y },
    ],
}));

/* E para que possamos utilizar a câmera, devemos pedir a permissão para o usuário,
para isso, vamos chamar uma função dentro do useEffect e caso o usuário não tenha
permitido, devemos retornar alguma coisa para que o usuário nos de o aceite: */

useEffect(() => {
    requestPermission();
}, []);

if (!permission?.granted) {
    return;
}

/*E temos a última função que mudará a nossa câmera da traseira para a frontal:*/

function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
}

/* E na nossa árvore de elementos, podemos teremos a nossa View envolvendo tudo
e dentro dela nosso componente de Câmera, junto com o nosso overlay de emojis e um
botão para trocar a câmera: */

return (
    <View style={styles.container}>
        <Camera
           style={styles.camera}
           type={type}
           onFacesDetected={handleFacesDetected}
           faceDetectorSettings={{
            mode: FaceDetector.FaceDetectorMode.fast,
            detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
            runClassifications: FaceDetector.FaceDetectorClassifications.all,
            minDetectionInterval: 100,
            tracking: true,
           }}
        />
        {faceDetected && <Animated.Image
            style={[animatedStyle, styles.emoji]}
            source={emoji}
        />}

        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                <Text style={styles.text}>Mudar Câmera</Text>
            </TouchableOpacity>
        </View>
    </View>
);