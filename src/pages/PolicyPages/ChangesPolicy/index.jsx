import React from "react";

export default function ChangesPolicy() {
  return (
    <div className="max-w-6xl mx-auto container">
      <section className=" backdrop-filter backdrop-blur-sm bg-opacity-50 rounded-xl m-5">
        <div className="flex flex-col items-center justify-center py-3">
          <span className="text-4xl font-bold text-gray-800">
            Changes Policy
          </span>
          <span className="px-5  py-8 text-md md:text-xl text-gray-800 max-w-5xl ">
            Welcome to{" "}
            <a
              href="https://www.bluepen.co.in/"
              className="text-blue-500 hover:text-blue-700 px-2"
            >
              www.bluepen.co.in!
            </a>
            <ul className="list-disc list-inside ">
              <li className="py-2">
                Bluepen offers a maximum of 2 changes/modifications to the
                assignments or projects completed by Bluepen. These changes are
                complimentary and are included in the billing amount itself.
              </li>
              <li className="py-2">
                Each change or modification should not be more than 250 words or
                similar and it should not be an addition to the guidelines. The
                changes can only be made within 14 days of you receiving the
                assignment or project from us.
              </li>
              <li className="py-2">
                Post the 2 complimentary changes and/or the 14 days period, the
                changes notified by the student or the user will be treated as a
                new project or assignment altogether and charged accordingly.
              </li>
              <li className="py-2">
                Once the changes have been made, the user needs to get back with
                an approval in a period of 3 days from the submission of the
                changes document. Post that, any changes will not be accepted.
              </li>
              <li className="py-2">
                In case of a resit assignment, the feedback file should match
                the original and final file sent by Bluepen. Any changes made in
                the final file post delivery without Bluepen’s knowledge won’t
                be considered for the case of resit or refund.
              </li>
              <li className="py-2">
                Bluepen thus reserves the right to decline to make changes once
                the time period is beyond 14 days and/or the 2 complimentary
                changes have been exhausted.
              </li>
            </ul>
          </span>
        </div>
      </section>
    </div>
  );
}
