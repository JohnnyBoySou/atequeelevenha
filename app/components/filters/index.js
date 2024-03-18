import { FlatList, Pressable, StyleSheet } from "react-native"
import { Title } from '@theme/global';
import { useContext } from "react";
import { ThemeContext } from 'styled-components/native';

export function Filters({ filters, filter, onChange }) {
  const { color, font } = useContext(ThemeContext)

  function Filter({
    filter,
    selected, ...rest }) {
    return (
      <Pressable
        style={{
          backgroundColor: selected ? color.primary : color.background, paddingHorizontal: 12, paddingVertical: 8,
          borderRadius: 100, 
        }}
        {...rest}
      >
        <Title style={{ color: selected ? '#fff' : color.label, fontSize: 18, letterSpacing: -0.4,}}>{filter}</Title>
      </Pressable>
    )
  }


  return (
    <FlatList

      data={filters}
      keyExtractor={(item) => item}
      renderItem={({ item }) => (
        <Filter
          filter={item}
          selected={item === filter}
          onPress={() => onChange(item)}
        />
      )}
      horizontal
      style={{ marginHorizontal: -20, marginTop: -20, paddingHorizontal: 20,  paddingVertical: 8, backgroundColor: color.background,}}
      showsHorizontalScrollIndicator={false}
      ListFooterComponent={<Pressable style={{ width: 70, height: 20, backgroundColor: color.background, }} />}
      contentContainerStyle={{gap: 12, paddingHorizontal: 20,}}
    />
  )
}

