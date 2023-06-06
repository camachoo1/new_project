import React, { useEffect } from 'react'
import './Homepage.css'
import aos from 'aos'
import 'aos/dist/aos.css'
import { GitHub, LinkedIn, Info } from '@mui/icons-material'
import { useAuth0 } from '@auth0/auth0-react'

interface HomepageProps {}

const Homepage: React.FC<HomepageProps> = () => {
  useEffect(() => {
    aos.init({duration: 600})
  }, [])

  const { loginWithRedirect } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect();
  };
  return (
    <div className='home__wrapper'>
      <div className='section__1__container'>
        <div className='nav__container'>
          <div className='nav__left'>
            {/* <img src={logo} alt='logo' height='50px' /> */}
            <p>New Project</p>
          </div>
          <div className='nav__mid'>
            <a
              href='https://github.com/camachoo1/Discable'
              target='_blank'
              rel='noreferrer'
              className='homepage__links'
            >
              <GitHub />
            </a>
            <a
              href='https://linkedin.com/in/omar-camacho-aa01b3133'
              target='_blank'
              rel='noreferrer'
              className='homepage__links'
            >
              <LinkedIn />
            </a>
            <a
              href='https://camachoo1.github.io/'
              target='_blank'
              rel='noreferrer'
              className='homepage__links'
            >
              <Info />
            </a>
          </div>
          <div className='nav__right'>
            <button className='homepage__button login__button' onClick={handleLogin}>
              Login / Sign 
            </button>
          </div>
        </div>

        <section data-aos='fade-right' data-aos-duration='1000' className='section__1'>
          <h1 className='homepage__main__heading'>
            New Project
          </h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi optio vitae similique fugiat veritatis dolor sed nihil, fugit tenetur quidem eos accusamus, beatae suscipit, esse nulla sapiente corrupti repellendus eligendi?
          </p>
          <button
            className='homepage__button open__button'
          >
            Open New Project
          </button>
        </section>

        <section data-aos='fade-up' data-aos-duration='1000' className='section__2'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Necessitatibus nesciunt dolores minus nemo, dolore facere
          quod magni tenetur, tempore distinctio minima dignissimos
          labore? Maiores eaque voluptates debitis quam sit
          cupiditate!
        </section>
      </div>
    </div>
  );
}

export default Homepage