# React Native - Câmera

## Hybrid Mobile App Development

## Câmera

A utilização de câmeras em aplicações móveis oferece muita vantagem quando precisamos de informações em tempo real, ou até mesmo de um histórico em fotos, ou se criarmos uma aplicação que envolva imagens. A seguir faremos um aplicativo que reconhece a nossa face, e mostra um emoji conforme a expressão do nosso rosto.

ATENÇÃO: Para que possamos criar e utilizar as bibliotecas do expo, precisamos
utilizar nossos celulares, pois as bibliotecas não suportam emuladores.

## Código do exemplo

Como sempre devemos primeiro criar nosso projeto, para isso não temos segredo, devemos apenas dar o comando e seguir o passo a passo: ***npx expo create-expo-app***

Após o projeto criado, podemos instalar 3 bibliotecas que nos ajudará nesse caminho: ***npx expo install expo-camera expo-face-detector react-native-reanimated***

Com esse comando devemos ter três bibliotecas instaladas:

1. expo-camera: que nos entrega as funções de câmera e permissões
2. expo-face-detector: que faz o reconhecimento facial
3. react-native-reanimated: nos ajudará com as animações

## Para utilização de emojis iremos usar o site:

https://getemoji.com/