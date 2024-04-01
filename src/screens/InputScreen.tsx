// import React, { useState, useEffect } from "react";
// import {
//   ActivityIndicator,
//   SafeAreaView,
//   StyleSheet,
//   View,
// } from "react-native";
// import { useSerachGifsQuery } from "../store/api";
// import { GifsList } from "../components/GifsList";
// import { GIF } from "../types";
// import { GifDetail } from "../components/GifDetail";
// import CategoriesContainer from "../components/CategoriesContainer";
// import { SplashScreen } from "../common/SplashScreen";
// import { useDebounce } from "../hooks/useDebounce";
// import { categories } from "../utils";

// export const InputScreen = () => {
//   const [selectedCategory, setSelectedCategory] = useState<string>(
//     categories[0]
//   );
//   const { debouncedValue } = useDebounce(selectedCategory, 500);
//   const [currentPage, setCurrentPage] = useState<number>(0);
//   const [gifDetail, setGifDetail] = useState<GIF | null>(null);
//   const [mergedData, setMergedData] = useState<GIF[]>([]);
//   const [dataLoading, setDataLoading] = useState<boolean>(false);
//   const [hasMore, setHasMore] = useState<boolean>(true);
//   const { data, isLoading, isFetching } = useSerachGifsQuery({
//     query: debouncedValue,
//     offset: currentPage * 20,
//     limit: 20,
//   });

//   useEffect(() => {
//     console.log("Selected Category ", selectedCategory);
//     if (isLoading || isFetching) {
//       setDataLoading(true);
//     } else {
//       setDataLoading(false);
//     }
//   }, [isLoading, isFetching]);

//   useEffect(() => {
//     console.log("Hi i am here fo checking submiting button ");
//     if (data) {
//       console.log("MergedData", selectedCategory);
//       setMergedData((prevData) => {
//         const newData = [...prevData, ...data];
//         return newData;
//       });
//     }
//   }, [data]);

//   const handleEndReached = () => {
//     if (!dataLoading && hasMore) {
//       setCurrentPage((prevPage) => prevPage + 1);
//     }
//   };

//   if (isLoading) {
//     return <SplashScreen />;
//   }

//   const handleInput = (text: string) => {
//     console.log("handleInput******",text);
//     setSelectedCategory(text);
//   };
//   if (gifDetail) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <GifDetail
//           gif={gifDetail}
//           onBack={() => setGifDetail(null)}
//           category={selectedCategory}
//         />
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <CategoriesContainer
//         onHandleInput={handleInput}
//         onSelectGifCategory={(item: string) => {
//           if (!isFetching) {
//             setSelectedCategory(item);
//             setMergedData([]);
//             setCurrentPage(0);
//             setHasMore(true);
//           }
//         }}
//         selectedCategory={selectedCategory}
//       />
//       <View style={{ flex: 1 }}>
//         <GifsList
//           Gifs={mergedData}
//           onSelectGifDetail={(item: GIF) => setGifDetail(item)}
//           handleEndReached={handleEndReached}
//         />
//       </View>

//       {dataLoading && mergedData.length > 0 && (
//         <View style={styles.loadingIndicator}>
//           <ActivityIndicator size="large" color="#0000ff" />
//         </View>
//       )}
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     position: "relative",
//   },
//   loadingIndicator: {
//     marginTop: 12,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "transparent",
//     maxHeight: 50,
//   },
// });

// export default InputScreen;
