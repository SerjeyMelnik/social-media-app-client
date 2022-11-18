import {FC} from 'react'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, DotGroup } from 'pure-react-carousel';
import NavigationIcon from '@mui/icons-material/Navigation';
import 'pure-react-carousel/dist/react-carousel.es.css';

type PostPicturesCarouselProps = {
pictures: string[]
}

export const PostPicturesCarousel:FC<PostPicturesCarouselProps> = ({pictures}) => {
	return (
		<div className="post_pictures-carousel-wrapper">
			<CarouselProvider 
			naturalSlideWidth={100}
			naturalSlideHeight={65}
			totalSlides={pictures.length}>
				<Slider className='custom-carousel'>
					{pictures.map((picture,i) => {
						return (
							<Slide index={i} key={i}>
								<div className="slide_picture">
									<img src={picture} alt="post picture" className='post_content-picture-img' />
								</div>
							</Slide>
						)
					})}
					
				</Slider>
				<DotGroup />
				<ButtonBack><NavigationIcon/></ButtonBack>
				<ButtonNext><NavigationIcon/></ButtonNext>
			</CarouselProvider>
		</div>
	)
}