import React, { useState, useEffect } from 'react';
import img1 from '../../public/images/img-16.jpg';
import img2 from '../../public/images/img-39.jpg';
import img4 from '../../public/images/img-17.jpg';
import img6 from '../../public/images/img-172.jpg';
import img5 from '../../public/images/img-2222.jpg';
import Navbar from '../Pages/Navbar';
import ImageGallerySlider from './Imageslider';
import Footer from './Footer';
import { CiInstagram,CiMail  } from "react-icons/ci";
import Form from './ContactForm';
import Aos from 'aos';
import 'aos/dist/aos.css';






export default function Home() {
  useEffect(() => {
    Aos.init({
      duration: 1500, 
      easing: 'ease-in-out', 
      once: true, 
    });
  }, []);
  
  const [showModal, setShowModal] = useState(false);

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };
  
  return (
    <div className='overflow-hidden'>
        <Navbar/>
        
        <section id='home'>
          
            <div className="container-fluid pb-5 ">
                <div className='row padding-related px-0 px-md-5'>
                   <div data-aos="fade-right" className="col-lg-6  d-flex align-items-center">
                   <div
  id="carouselExampleFade"
  className="carousel slide carousel-fade main-img-box-effect"
  data-bs-ride="carousel"
>
  {/* Dots */}
  <div className="carousel-indicators">
    {[0, 1].map((i) => (
      <button
        key={i}
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide-to={i}
        className={i === 0 ? 'active' : ''}
        aria-label={`Slide ${i + 1}`}
      ></button>
    ))}
  </div>

  {/* Slides */}
  <div className="carousel-inner">
    {[img1, img6].map((img, i) => (
      <div key={i} className={`carousel-item ${i === 0 ? 'active' : ''}`}>
        <img src={img} className="d-block w-100 img-fluid" alt={`Slide ${i + 1}`} />
      </div>
    ))}
  </div>
</div>


                   </div>
                   <div  className="col-lg-6 baner-heading">
                    <h1 data-aos="fade-up"data-aos-duration="2000">Hello! I am Bharti. A lifestyle fashion model based in Jaipur.</h1>
                    <p className='fs-4 lh-lg'>Available for assignments worldwide.</p>

                    <button className='main-btn'onClick={handleModalToggle}>Get In Touch</button>
                   </div>
                </div>
            </div>
        </section>
              {/* Modal */}
      {showModal && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="btn-close" onClick={handleModalToggle} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <Form /> {/* Display the form component here */}
              </div>
            </div>
          </div>
        </div>
      )}
{/* ------- */}
        <section id='about' className="about-section bg-dark mb-5 text-light py-5">
      <div className="container-fluid px-0 px-md-5">
        <div className="row align-items-center justify-content-center ">
          <div className="col-lg-7 col-md-8 col-12 mb-4 mb-lg-0">
            <div className="about-content p-4 ">
              <h1 data-aos="fade-up"data-aos-duration="1500" className="display-5 mb-4">Professional Model</h1>
              <p className="mb-4">
              I am a professional model based in Jaipur Rajasthan, with over 3 years of experience in the fashion and beauty industry. My work is driven by a passion for expression and a love for storytelling through imagery. I collaborate with photographers, designers, and creatives to bring unique visions to life, ensuring each shoot is memorable and impactful.
              </p>
              <p>I believe in the power of confidence and authenticity—qualities that I bring to every project. Whether it's high fashion, commercial, or editorial, I always aim to push boundaries and create stunning visuals that resonate with audiences.
             </p>
             <p>For me, modeling is not just about posing in front of a camera; it's about embracing the art of transformation and embodying different personas. I am dedicated to my craft and always eager for new opportunities to grow and challenge myself in this dynamic industry.</p>
              <button className="btn bg-black text-white"onClick={handleModalToggle}>Contact Me</button>
            </div>
          </div>
          <div className="col-lg-5 col-md-8 col-sm-10">
          <div className="about-image-container">
  <div className="image-wrapper">
    <img data-aos="fade-left" src={img2} alt="bharti" className="img-fluid " />
    <svg className="hover-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="40" />
    </svg>
  </div>
</div>

          </div>
        </div>
      </div>
    </section>
        {/* slider section start */}
        <section id='portfolio' className='pb-5'>
       <ImageGallerySlider/>
 </section>

 <section>
  <div className="container-fluid contact-banner-bg mb-5">
<a target='blank' href="https://www.instagram.com/_bharti.s?utm_source=qr&igsh=MWNjN3F2c2k5NW84">
<CiInstagram style={{
  fontSize:'50px',
  cursor:'pointer',
  color:'white'
}}/>
</a>
<a href="mailto:bhartikumawat89499@gmail.com">
  <CiMail
    style={{
      fontSize: '50px',
      cursor: 'pointer',
      color: 'white',
    }}
  />
</a>

  </div>
 </section>




 <section id='vital'>
    <div className="container-fluid">
        <div className="row px-0 px-md-5">
            <div className="col-lg-5 ">
            <div className='main-img-box-effect'>
            <video 
            data-aos="fade-right"
        width="100%" 
        height="auto" 
        controls 
        autoPlay 
        muted 
        loop
      >
        <source src="/images/video/walk-video.MP4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
                    </div>
            </div>
            <div data-aos="fade-up"data-aos-duration="1500" className="col-lg-7 new-heading">
                <p className='fs-2'>Vital Stats</p>
                <h1>Height:178cm <br className='d-block d-md-none'/>/5.10</h1>
                <h1>Bust: 34</h1>
                <h1>Waist: 30</h1>
                <h1>Eyes: Brown</h1>
                <h1>Hips: 40</h1>
                <h1>Hair: Brown</h1>
            </div>
        </div>
    </div>

 </section>

 <Footer/>
      
    </div>
  )
}
