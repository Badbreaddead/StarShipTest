import * as React from "react";
import { StyleSheet, FlatList } from "react-native";

import { getProducts } from "../api";
import { Text, View } from "../components/Themed";

export default function ProductsScreen() {
  const [products, setProducts] = React.useState<any[]>([]);
  const [hasNext, setHasNext] = React.useState<boolean>(false);
  const [pageNumber, setPageNumber] = React.useState<number>(1);

  const fetchProducts = async () => {
    const data = await getProducts(pageNumber);
    setProducts([...products, ...data.data.items]);
    setHasNext(data.data.next);
    setPageNumber(pageNumber + 1);
  };

  React.useEffect(() => {
    fetchProducts();
  }, []);

  const fetchMoreItems = () => {
    fetchProducts();
  };

  const renderItem = ({ item }: { item: any; index: number }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.title}>{item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item: any) => `${item.id}`}
        onEndReachedThreshold={0.5}
        onEndReached={hasNext ? fetchMoreItems : undefined}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  item: {
    display: "flex",
    flexDirection: "column",
    borderColor: "black",
    borderWidth: 1,
    marginBottom: 8,
    marginHorizontal: 8,
    borderRadius: 4,
  },
  title: {
    fontSize: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
