import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { styled } from 'styled-components';
import Link from 'next/link';

const NavWrapper = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    padding: 2rem;
    width: 100%;
    max-width: 960px;
    background-color: #fff;
    border-bottom: 1px solid #eaeaea;
`;

interface NavbarProps {
    path: string;
}

const Navbar = ({ path }: NavbarProps) => {
    const router = useRouter();

    function handleOptionChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const selectedValue = event.target.value;
        router.push(`${selectedValue}`);
    }

    return (
        <NavWrapper>
            <div>
                <label htmlFor="options">Go to: </label>
                <select id="options" value={path} onChange={handleOptionChange}>
                    <option value="/">Home</option>
                    <option value="/js-quiz">Javascript Quiz</option>
                    {/* <option value="/meme-gen">Meme Generator</option> */}
                    <option value="/img-gen">Image Generator</option>
                    <option value="/marketing-copy-gen">
                        Marketing Copy Generator
                    </option>
                </select>
            </div>

            <Link href={'https://platform.openai.com/docs/introduction'}>
                Open AI API Docs
            </Link>
        </NavWrapper>
    );
};

export default Navbar;
