import React from 'react';

export default function RefundPolicy() {
  return (
    <div className="max-w-6xl mx-auto container">
      <section className=" backdrop-filter backdrop-blur-sm bg-opacity-50 rounded-xl m-5">
        <div className="flex flex-col items-center justify-center py-3">
          <span className="text-4xl font-bold text-gray-800">
            Refund and Cancellation Policy
          </span>
          <span className="px-5  py-8 text-md md:text-xl text-gray-800 max-w-5xl ">
            Welcome to{' '}
            <a
              href="https://www.bluepen.co.in/"
              className="text-blue-500 hover:text-blue-700 px-2"
            >
              www.bluepen.co.in!
            </a>
            <ul className="list-disc list-inside ">
              <li className="py-2">
                For the assignments or projects having a deadline of 3 days from
                the date of submission to bluepen, a 100% refund of the amount
                paid by the user will be given for cancellation up to 12 hrs
                from the time of submission to bluepen,
              </li>
              <li className="py-2">
                50% refund of the amount paid by the user will be given for
                cancellation up to 24 hours from the time of submission to
                bluepen.
              </li>
              <li className="py-2">
                On cancellation of assignments or projects after 24 hours, no
                refund would be credited.
              </li>
              <li className="py-2">
                There is a 0% refund for any type of copy-paste or handwritten
                assignments on cancellation.
              </li>
              <li className="py-2">
                For assignments under the category of Academic writing, no
                refund will be granted, if the deadline is less than 3 days from
                the time of submission to bluepen.
              </li>
              <li className="py-2">
                For technical projects having long deadlines, a 100% refund of
                the amount paid by the user will be granted if cancellation
                takes place within the first 3 days from the time of submission
                to bluepen, 50% refund of the amount paid by the user will be
                granted for cancellations taking place within 3 to 10 days. On
                cancellation of projects after 10 days, no refund will be
                granted.
              </li>
            </ul>
          </span>
        </div>
      </section>
    </div>
  );
}
