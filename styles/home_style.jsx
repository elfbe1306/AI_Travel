import { StyleSheet, Dimensions } from 'react-native'
import { Colors } from '../constants/Colors'

const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth * 2) / 3;
const cardHeight = Dimensions.get('window').height * 0.35;

export const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
  },
  bodyContainer: {
    flex: 2,
  },
  firstHeaderContainer: {
    gap: screenWidth - 300,
    marginTop: '15%',
    flexDirection:'row',
  },
  userNameBox: {
    backgroundColor: 'white',
    paddingLeft: 5,
    paddingRight: 30,
    paddingVertical: 5,
    borderRadius: 40,
    marginLeft: '5%',
    flexDirection:'row',
    width: 200,
  },
  imageBox: {
    backgroundColor: 'pink',
    borderRadius: 99,
    height: 50,
  },
  userImage : {
    top: -30,
    width: 50,
    height: 75,
  },
  userName: {
    marginTop: 16,
    marginLeft: 10,
    fontFamily: 'nunito-bold',
    textAlign:'center'
  },
  notificationButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 99,
  },
  secondHeaderContainer: {
    marginTop: '5%',
    marginLeft: '7%',
    position: 'relative', // Cần thiết để định vị hình ảnh calligraphy line
  },
  calligraphyLine: {
    position: 'absolute',
    bottom: -10, // Điều chỉnh vị trí dọc
    right: '20%', // Điều chỉnh vị trí ngang
    width: 150, // Điều chỉnh kích thước hình ảnh
    height: 20, // Điều chỉnh kích thước hình ảnh
    resizeMode: 'contain', // Đảm bảo hình ảnh không bị méo
  },
  secondHeaderContainerTitleText: {
    fontFamily: 'nunito-bold',
    fontSize: 30
  },
  firstBodyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '5%',
    alignItems: 'center',
  },
  tourTitle: {
    fontFamily: 'nunito-bold',
    fontSize: 18,
    color: Colors.DARK_GREEN,
  },
  viewAllText: {
    fontFamily: 'nunito',
    fontSize: 12,
    color: Colors.DARK_GREEN,
  },
  tourScrollView: {
    paddingVertical: 10,
  },
  tourCard: {
    backgroundColor: '#FFE68A',
    borderRadius: 20,
    marginHorizontal: 10,
    width: cardWidth,
    height: '70%',
    padding: 12,
    // Hiệu ứng shadow để tạo cảm giác nổi
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
    // Border xung quanh card
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    // Giảm độ đậm của border ở bottom
    borderBottomWidth: 0.5, // Giảm độ dày của border ở bottom
    borderBottomColor: 'rgba(255, 255, 255, 0.2)', // Giảm độ đậm của border ở bottom
  },
  tourImage: {
    width: '100%',
    height: '75%',
    borderRadius: 17,
    // aspectRatio: 4 / 3,
  },
  tourDestination: {
    fontFamily: 'Nunito',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 24,
    letterSpacing: 0.5,
    color: '#1B1E28',
    marginTop: 10,
  },
  tourDate: {
    fontFamily: 'Nunito',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
    letterSpacing: 0.5,
    color: '#7D848D',
  },
  tourMarker: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(27, 30, 40, 0.2)',
    width: 34,
    height: 34,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'blur(30px)',
  },
});