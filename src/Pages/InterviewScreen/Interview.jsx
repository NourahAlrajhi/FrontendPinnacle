import * as React from 'react';
import Interview_welcome_screen from './Interview_welcome_screen';
// ------css import-----
import './Interview.css'
import Question_interview from './Question_interview';
export default function Interview() {

    return (

        <>
            <section className='Interview_section Interview_section_dasboard'>
                <Interview_welcome_screen />
                {/* <Question_interview/> */}

            </section>
        </>
    );
}
