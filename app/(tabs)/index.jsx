import { View, Button, Text } from 'react-native';
import Animated, { useSharedValue, withSpring, useAnimatedStyle, withRepeat, withTiming, withDelay } from 'react-native-reanimated';
import { useEffect, useState } from 'react';



export default function HomeScreen() {
  const offset = useSharedValue(-300);

  const [show, setShow] = useState(true);

  // Se declaran los valores compartidos que se utilizaran para la animacion
  const opacity1 = useSharedValue(1);
  const opacity2 = useSharedValue(1);
  const opacity3 = useSharedValue(1);
  const backgroundColor = useSharedValue('black');

  // Se declaran las constantes que se utilizaran para la animacion
  const duration = 1000;
  const delay = 500;

  // Funcion que se encarga de ocultar o mostrar los textos y cambiar el color de fondo
  const ocultar = () => {
    // Se verifica si se esta mostrando o no
    // si show es true se ocultan los textos y se cambia el color de fondo
    if (!show) {
      // Se utilizan las funciones de reanimated para realizar la animacion
      opacity1.value = withDelay(0 * delay, withTiming(1, { duration: duration }));
      opacity2.value = withDelay(1 * delay, withTiming(1, { duration: duration }));
      opacity3.value = withDelay(2 * delay, withTiming(1, { duration: duration }));
      backgroundColor.value = withTiming('black', { duration: duration});
    }
    // si show es false se muestran los textos y se cambia el color de fondo
    else {
      // Se utilizan las funciones de reanimated para realizar la animacion
      opacity1.value = withDelay(0 * delay, withTiming(0, { duration: duration }));
      opacity2.value = withDelay(1 * delay, withTiming(0, { duration: duration }));
      opacity3.value = withDelay(2 * delay, withTiming(0, { duration: duration }));
      backgroundColor.value = withTiming('green', { duration: duration+ 1000});
    }
    setShow(!show);
  };


  const text = ['React ', 'Native ', 'Reanimated'];

  // Se crea el estilo animado que se utilizara para mover los textos
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: offset.value }],
    };
  });

  // Se ejecuta la animacion al cargar el componente
  // Aca se crea la animacion que se encargara de mover los textos
  useEffect(() => {
    offset.value = withSpring(0, { duration: 4000 });
  }, []);

  // Se crean los estilos animados que se utilizaran para cambiar la opacidad de los textos
  const animatedOpacityStyle1 = useAnimatedStyle(() => {
    return {
      opacity: opacity1.value,
    };
  });

  const animatedOpacityStyle2 = useAnimatedStyle(() => {
    return {
      opacity: opacity2.value,
    };
  });

  const animatedOpacityStyle3 = useAnimatedStyle(() => {
    return {
      opacity: opacity3.value,
    };
  });

  // Se crea el estilo animado que se utilizara para cambiar el color de fondo
  const animatedBackgroundColor = useAnimatedStyle(() => {
    return {
      backgroundColor: backgroundColor.value,
    };
  });

  return (
    <Animated.View style={[{flex: 1, alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'black'},
      animatedBackgroundColor,
    ]}>
      <View style={{flex:1, flexDirection: 'row'}}>
        < Animated.Text style={[
          Object.assign(Object.assign({}, {fontSize:34, fontWeight: 'bold', color:'white', marginTop: 200})),
          animatedOpacityStyle1,
          animatedStyle]}>
          {text[0]}
        </Animated.Text>
        < Animated.Text style={[{fontSize:34, fontWeight: 'bold', color:'white', marginTop: 200},
          animatedOpacityStyle2,
          animatedStyle]}>
          {text[1]}
        </Animated.Text>
        < Animated.Text style={[{fontSize:34, fontWeight: 'bold', color:'white', marginTop: 200},
          animatedOpacityStyle3,
          animatedStyle]}>
          {text[2]}
        </Animated.Text>
      </View>
      <View style={{ marginBottom: 100, width: 200}}>
        <Button title='Iniciar' onPress={ocultar} />
      </View>
    </Animated.View>
  );
}