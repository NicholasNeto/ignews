import { render, screen } from '@testing-library/react'
import { getPrismicClient } from '../../services/prismic'
import { mocked } from 'ts-jest/utils'
import Post, { getServerSideProps } from '../../pages/posts/[slug]'
import { redirect } from 'next/dist/next-server/server/api-utils'
import { getSession } from 'next-auth/client'

jest.mock('../../services/prismic')
jest.mock('next-auth/client')

describe('Posts page', () => {
    it('renders correctly', () => {
        render(<Post post={{
            slug: 'my-new-post',
            title: 'My New Post',
            content: '<p>Post excerprt<p>',
            updatedAt: '10 de Abril',
        }} />)

        expect(screen.getByText('My New Post')).toBeInTheDocument()
        expect(screen.getByText('Post excerprt')).toBeInTheDocument()
    })


    it('redirects user if no subscriptions is found', async () => {

        const getSessionMocked = mocked(getSession)
        getSessionMocked.mockResolvedValueOnce({
            activeSubscription: null
        } as any)

        const response = await getServerSideProps({} as any)
        expect(response).toEqual(
            expect.objectContaining({
                redirect: expect.objectContaining({
                    destination: '/',
                })
            })
        )
    })





    it('loads initial data', async () => {
        const getSessionMocked = mocked(getSession)
        const getPrismicClientMocked = mocked(getPrismicClient)

        getSessionMocked.mockResolvedValueOnce({
            activeSubscription: 'fake-active-subscriptions'
        } as any)




        getPrismicClientMocked.mockReturnValueOnce({
            getByUID: jest.fn().mockResolvedValueOnce({
                data: {
                    title: [{ type: 'heading', text: 'My New Post' }],
                    content: [{ type: 'paragraph', text: 'Post content' }],
                },
                last_publication_date: '04-01-2021'
            })
        } as any)



        const response = await getServerSideProps({ params: { slug: 'my-new-post' } } as any)


        expect(response).toEqual(
            expect.objectContaining({
                props: {
                    post: {
                        slug: 'my-new-post',
                        title: 'My New Post',
                        content: '<p>Post content</p>',
                        updatedAt: '01 de abril de 2021'
                    }
                }
            })
        )
    })
})
