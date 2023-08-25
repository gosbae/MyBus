import {Animated} from 'react-native';

type AnimationProps = {
  fadeAnim: Animated.Value;
};
const fadeIn = (fadeAnim: Animated.Value) => {
  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 5000,
    useNativeDriver: true,
  }).start();
};

const fadeOut = (fadeAnim: Animated.Value) => {
  Animated.timing(fadeAnim, {
    toValue: 0,
    duration: 5000,
    useNativeDriver: true,
  }).start();
};

export {fadeIn, fadeOut};
export type {AnimationProps};
