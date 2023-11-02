import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  content: {
    marginHorizontal: 15,
  },
  review: {
    paddingVertical: 20,
  },
  title: {
    fontWeight: "bold",
  },
  subtitle: {
    margin: 5,
  },
  contentRatingDate: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  date: {
    fontSize: 12,
    color: "#828282",
  },
  moreCommentBtn: {
    alignSelf: "center",
    color: "#00a680",
    marginVertical: 10,
  },
  loading: {
    marginVertical: 10,
  },
});
