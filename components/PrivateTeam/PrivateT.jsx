import React from 'react'
import { SecondryBtn } from '../Button/Buttons';
import {FadeUpOnScroll} from '../Animations/ScrollAnimation'
function PrivateT() {
  return (
    <div>
      <div className="col">
        <div className="text  sm:max-w-[800px] m-auto mt-3 text-center  leading-3 ">
          <h5
            className="font-[800] text-[35px] font-[Geist]  p-2"
            data-aos="fade-up"
          >
            Private Communication Built for Teams
          </h5>
          <div className="cd-description prbtns text-[20px]" data-aos="fade-up">
            Connect securely with your team using just your organization’s
            unique access code—no phone numbers, no personal data. Chat, share
            files, and jump on HD video calls - all in one confidential,
            all-in-one platform built for hospitals and large organizations.
          </div>
          <div className="btn mt-3 mb-3 ">
            <SecondryBtn />
          </div>
        </div>
        <div
          className="image w-[98%] m-auto h-[200px] sm:h-[500px] iphone mt-3 max-width"
          data-aos="fade-up"
        ></div>
      </div>
    </div>
  );
}

export default PrivateT