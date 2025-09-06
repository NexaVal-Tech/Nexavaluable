import React from 'react'
import {SecondryBtns} from '../Button/Buttons'
function WhySec() {
  return (
    <div className=" overflow-hidden ">
      <div className="container mt-5">
        <div className="text w-[99%] text-center">
          <div className="cd-titl font-[800] text-[35px] font-[Geist]  p-2">
            See why we are your best tech partner
          </div>
          <div className="cd-description w-[90%] sm:w-[50%] m-auto text-[14px]">
            We help you move from concept to launch with a full stack of
            creative and technical services.
          </div>
          <div className="btn mt-5 mb-5">
            <SecondryBtns />
          </div>
        </div>
        <div className="cards">
          <section className=" w-[80%] sm:w-[100%] mx-auto max-width">
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-2
        lg:[&>*:nth-child(2)]:-mt-8 lg:[&>*:nth-child(5)]:-mt-8"
            >
              {/* Card 1 */}
              <article
                className="bg-white rounded-2xl shadow-md p-6 min-h-[240px] flex flex-col justify-between"
                data-aos="fade-right"
              >
                <div className="mb-4 text-[#09244B] text-[30px]">★★★★★</div>
                <p className="text-gray-600 ">
                  “NexavalTech supported me throughout my app development
                  journey, transforming my ideas into a real product. At first,
                  I didn’t know where or how to start, but their team guided me
                  through every stage of the process. ”
                </p>
                <div className="mt-4 flex items-center gap-3">
                  {/* <img
                    className="w-10 h-10 rounded-full"
                    src="https://i.pravatar.cc/40?img=1"
                    alt="User 1"
                  /> */}
                  <span className="font-semibold">Salim</span>
                </div>
              </article>
              {/* Card 2 */}
              <article
                className="bg-white rounded-2xl shadow-md p-6 min-h-[240px] flex flex-col justify-between lg:mb-10"
                data-aos="fade-left"
              >
                <div className="mb-4 text-[#09244B] text-[30px]">★★★★★</div>
                <p className="text-gray-600">
                  “NexavalTech helped us design and develop our learning
                  platform. The team is highly dedicated and kept us involved at
                  every step. Their openness and support are truly top-notch.”
                </p>
                <div className="mt-4 flex items-center gap-3">
                  {/* <img
                    className="w-10 h-10 rounded-full"
                    src="https://i.pravatar.cc/40?img=2"
                    alt="User 2"
                  /> */}
                  <span className="font-semibold">David</span>
                </div>
              </article>
              {/* Card 3 */}
              <article
                className="bg-white rounded-2xl shadow-md p-6 min-h-[240px] flex flex-col justify-between"
                data-aos="fade-up-right"
              >
                <div className="mb-4 text-[#09244B] text-[30px]">★★★★★</div>
                <p className="text-gray-600">
                  “NexavalTech helped refine my ideas, outlined a clear roadmap,
                  and guided me on how I could build my e-commerce platform. The
                  team is highly innovative, accommodating, and a pleasure to
                  work with. I would choose them again and again.”
                </p>
                <div className="mt-4 flex items-center gap-3">
                  {/* <img
                    className="w-10 h-10 rounded-full"
                    src="https://i.pravatar.cc/40?img=3"
                    alt="User 3"
                  /> */}
                  <span className="font-semibold">Emmanuel</span>
                </div>
              </article>
              {/* Card 4 */}
              <article
                className="bg-white rounded-2xl shadow-md p-6 min-h-[240px] flex flex-col justify-between"
                data-aos="fade-up-left"
              >
                <div className="mb-4 text-[#09244B] text-[30px]">★★★★★</div>
                <p className="text-gray-600">
                  “I was experiencing a high bounce rate on my e-commerce
                  platform, but NexavalTech showed me how to optimize the site
                  and SEO to improve conversions. Great team! .”
                </p>
                <div className="mt-4 flex items-center gap-3">
                  {/* <img
                    className="w-10 h-10 rounded-full"
                    src="https://i.pravatar.cc/40?img=4"
                    alt="User 4"
                  /> */}
                  <span className="font-semibold"> Francis</span>
                </div>
              </article>
              {/* Card 5 */}
              {/* <article
                className="bg-white rounded-2xl shadow-md p-6 min-h-[240px] flex flex-col justify-between lg:mb-5"
                data-aos="fade-right"
              >
                <div className="mb-4 text-[#09244B] text-[30px]">★★★★★</div>
                <p className="text-gray-600">
                  “NexavalTech took our rough idea and turned it into a polished
                  platform in just weeks. Their design and dev team felt like
                  part of our startup.”
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <img
                    className="w-10 h-10 rounded-full"
                    src="https://i.pravatar.cc/40?img=5"
                    alt="User 5"
                  />
                  <span className="font-semibold">Robert F</span>
                </div>
              </article> */}
              {/* Card 6 */}
              {/* <article
                className="bg-white rounded-2xl shadow-md p-6 min-h-[240px] flex flex-col justify-between"
                data-aos="fade-left"
              >
                <div className="mb-4 text-[#09244B] text-[30px]">★★★★★</div>
                <p className="text-gray-600">
                  “NexavalTech took our rough idea and turned it into a polished
                  platform in just weeks. Their design and dev team felt like
                  part of our startup.”
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <img
                    className="w-10 h-10 rounded-full"
                    src="https://i.pravatar.cc/40?img=6"
                    alt="User 6"
                  />
                  <span className="font-semibold">Chloe M</span>
                </div>
              </article> */}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default WhySec