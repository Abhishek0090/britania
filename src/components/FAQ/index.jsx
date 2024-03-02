import React from 'react';
import { Disclosure, Transition } from '@headlessui/react';
import { BiMinus } from 'react-icons/bi';
import { BsPlusLg } from 'react-icons/bs';

const faqs = [
  {
    id: 1,
    question: 'What type of assignments can your freelancers help with?',
    answer:
      ' Our freelancers can help with a wide range of assignments including research papers, dissertations, coding assignments, statement of purpose, and more. Just upload your requirements and let us handle the rest.',
  },
  {
    id: 2,
    question: 'How do I ensure the quality of the work delivered?',
    answer:
      'We ensure that all assignments go through a rigorous quality check process before they are delivered to our students. Additionally, we have a system in place for revisions and corrections until you are satisfied with the final outcome.',
  },
  {
    id: 3,
    question: ' How do I make the payment for my assignment?',
    answer:
      'You can pay for your assignment using a variety of secure payment options, including Gpay, Paytm, UPI and online bank transfers. Our payment process is hassle-free and straightforward.',
  },
  {
    id: 4,
    question: ' Is your service available 24/7?',
    answer:
      'Yes, our portal is available 24/7 for students to upload their requirements. However, please note that the turnaround time for assignments may vary depending on the complexity of the project and the availability of our freelancers.',
  },
];
export default function FAQ() {
  return (
    <section className="text-gray-900 w-full md:mb-20 mb-10  px-4 pt-16 md:max-w-5xl mx-auto">
      <div className="container flex flex-col justify-center p-4 mx-auto md:p-8">
        <h2 className="mb-2 text-4xl font-bold leading-none text-center sm:text-5xl">
          Frequently Asked Questions
        </h2>
        <h3 className="mb-10 text-gray-700 md:max-w-2xl mx-auto text-center">
          Here are some of the most common questions we get asked by our
          students. If you have any other questions, feel free to reach out to
          us.
        </h3>
        <div className="grid gap-10  md:grid-cols-1 ">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="border border-gray-300 rounded-md shadow-sm"
            >
              <Disclosure>
                {({ open }) => (
                  <div className="p-5">
                    <Disclosure.Button className="font-semibold flex items-center justify-between w-full">
                      <span>{faq.question}</span>
                      <span>{open ? <BiMinus /> : <BsPlusLg />}</span>
                    </Disclosure.Button>
                    <Transition
                      show={open}
                      enter="transition duration-1000 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-100 ease-out"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Disclosure.Panel static className="mt-1 text-gray-700">
                        <p>{faq.answer}</p>
                      </Disclosure.Panel>
                    </Transition>
                  </div>
                )}
              </Disclosure>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
