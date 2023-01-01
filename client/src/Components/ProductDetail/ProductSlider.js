import { Carousel } from  'react-carousel-minimal';
import './Product.css'
function App(props) {
 const data = [
    {
      image: props.image1,
      caption: props.title,
    },
    {
      image: props.image2,
      caption:props.title,
    },
    {
      image: props.image3,
      caption: props.title,
    },
   
  ];


  return (
    <div className="App">
      <div style={{ textAlign: "center" }}>
        <div style={{
          padding: "0 20px"
        }}>
          <Carousel
            data={data}
            time={1500}
            width="800px"
            height="500px"
            radius="10px"
            captionPosition="bottom"
            automatic={true}
            dots={true}
            pauseIconColor="white"
            pauseIconSize="40px"
            slideBackgroundColor="darkgrey"
            slideImageFit="cover"
            thumbnails={true}
            thumbnailWidth="95px"
            style={{
              textAlign: "center",
              justifyContent:'center',
              maxWidth: "850px",
              maxHeight: "500px",
              margin: "30px auto",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;