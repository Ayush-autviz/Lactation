// Input.tsx
import React from 'react';
import { View, TextInput, Image, StyleSheet, ImageSourcePropType } from 'react-native';
import { COLORS } from '../Constants/Theme';

interface InputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  iconSource?: ImageSourcePropType;
  style?: object;
}

const Input: React.FC<InputProps> = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  iconSource,
  style,
}) => {
  return (
    <View style={[styles.inputContainer, style]}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#999"
        secureTextEntry={secureTextEntry}
      />
      
      {iconSource && (
        <>
          <View style={styles.divider} />
          <View style={styles.iconContainer}>
            <Image source={iconSource} />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#999',
    paddingHorizontal: 10,
  },
  divider: {
    width:1,
    height:25,
    backgroundColor: COLORS.borderColor,
    marginVertical: 10,
    marginRight: 10,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10,
  },
});

export default Input;