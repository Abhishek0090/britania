import React from 'react';

export default function PaymentPolicy() {
  return (
    <div className="max-w-6xl mx-auto container">
      <section className=" backdrop-filter backdrop-blur-sm bg-opacity-50 rounded-xl m-5">
        <div className="flex flex-col items-center justify-center py-3">
          <span className="text-4xl font-bold text-gray-800">
            Payment Policy
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
                All kinds of assignments and projects are confirmed by Bluepen Assignment Private Limited
                and started working on by us only on receiving either full
                payment in advance or partial payment of at least 50% of the
                total order value.
              </li>
              <li className="py-2">
                Only upon receiving the complete payment, the assignment would
                be sent or dispatched to you.
              </li>
              <li className="py-2">
                We accept payment in UPI, Bank transfer, Wallet Transfer, and
                Cash.
              </li>
              <li className="py-2">
                All assignments, projects undertaken by us are confirmed and
                thereby allotted to the writers only once the user has processed
                us the advance.
              </li>
              <li className="py-2">
                Thus the deadline for us begins only once we receive the advance
                payment.
              </li>
            </ul>
          </span>
          <span className="text-xl text-left font-bold">Non-technical</span>
          <span className="px-5  py-8 text-md md:text-xl text-gray-800 max-w-5xl ">
            <strong>For Handwritten and copy-paste assignments</strong>, the
            charges begin from INR 7 per side of an A4 size sheet. The rates may
            vary if the deadline is short, if there are complicated diagrams to
            be drawn and the charges are different if they need to be done on a
            specific sheet of the university or college of the user.
            Additionally, extra charges apply if the hard copy is to be
            delivered to the student’s doorstep. The total charges will be
            clearly mentioned to the user and only once the user accepts the
            price quotation and processes an advance, the order for the
            assignment is placed.
            <br />
            <strong> For Research-based report writing</strong>, essay writing,
            review article, non-technical type of assignments falling under
            commerce and arts domain the charges will be as follows :<br />
            <ul className="list-decimal list-inside ">
              <li className="py-2">
                Bachelor’s Assignment (Indian University): 85 Paisa to 1.10 INR
                per word. May vary depending upon the complexity, urgency and/or
                if any additional data collection, analysis or primary research
                is required.
              </li>
              <li className="py-2">
                Master’s Assignment (Indian University) : 1.3 INR to 1.6 INR per
                word. May vary depending upon the complexity, urgency and/or if
                any additional data collection, analysis or primary research is
                required.
              </li>
              <li className="py-2">
                PhD Assignment (Indian University): 3.5 INR to 4.5 INR per word.
                May vary depending upon the complexity, urgency and/or if any
                additional data collection, analysis, or primary research is
                required.
              </li>
              {/* <li className="py-2">
                Bachelor’s Assignment (Foreign University) : 1.5 INR to 1.7 INR
                per word. May vary depending upon the complexity, urgency,
                and/or if any additional data collection, analysis, or primary
                research is required.
              </li> */}
              <li className="py-2">
              Bachelor’s and/or Master’s Assignment (Foreign University) : 2.2 INR to 2.5 INR
                per word. May vary depending upon the complexity, urgency.
                And/or if any additional data collection, analysis or primary
                research is required.
              </li>
              <li className="py-2">
                PhD Assignment (Foreign Uiversity) : 6.5 INR to 7.5 INR per
                word. May vary depending upon the complexity, urgency. And/or if
                any additional data collection, analysis or primary research is
                required.
              </li>
            </ul>
          </span>
          <span className="text-xl text-left font-bold">
            Technical Projects
          </span>
          <span className="px-5  py-8 text-md md:text-xl text-gray-800 max-w-5xl ">
            For projects of final year engineering, the charges start from INR
            8999/- For technical reports and dissertations under science &
            technology the charges of the report will be as follows :<br />
            Black Book (Bachelor’s - Engineering, BCA, BSc. IT, etc) - INR
            2,000/- onwards
            <br />
            7. Master’s report and documentation of any type : 2.5 INR to 3.5
            INR per word. May vary depending upon the complexity, urgency.
            And/or if any additional data collection, analysis or primary
            research is required.
          </span>
          <span className="text-xl text-left font-bold">
            Ppt, presentations
          </span>
          <span className="px-5  py-8 text-md md:text-xl text-gray-800 max-w-5xl ">
            <ul className="list-disc list-inside ">
              <li className="py-2">
                For PPTs that requires designing and content that can be
                copy-pasted, charges start from 40 INR per slide for Bachelor’s
                course.
              </li>
              <li className="py-2">
                If it is a research-based ppt that requires Plagiarism below
                15%, charges start from 80 INR per slide, for bachelor’s as well
                as Master’s courses in all domains.
              </li>
              <li className="py-2">
                Any other type of commercial use ppt, pitch decks (non-academic)
                please contact us directly. Quotations may vary depending upon
                the complexity, and purpose.
              </li>
            </ul>
          </span>
        </div>
      </section>
    </div>
  );
}
