import { render, screen } from '@testing-library/react'
import { useSession } from 'next-auth/client'
import { mocked } from 'ts-jest/utils'

import { getPrismicClient } from '../../services/prismic'
import PostPreview, { getStaticProps } from '../../pages/posts/preview/[slug]'
import { useRouter } from 'next/router'

jest.mock('../../services/prismic')
jest.mock('next-auth/client')
jest.mock('next-auth/client')
jest.mock('next/router')

describe('Post Preview page', () => {
    it('renders correctly', () => {

        const useSessionMocked = mocked(useSession)
        useSessionMocked.mockReturnValueOnce([null, false])


        render(<PostPreview post={{
            slug: 'my-new-post',
            title: 'My New Post',
            content: '<p>Post excerprt<p>',
            updatedAt: '10 de Abril',
        }} />)

        expect(screen.getByText('My New Post')).toBeInTheDocument()
        expect(screen.getByText('Post excerprt')).toBeInTheDocument()
        expect(screen.getByText('Wanna continue reading?')).toBeInTheDocument()
    })


    it('redirects user to full post when user is subcribed', async () => {

        const useSessionMocked = mocked(useSession)
        useSessionMocked.mockReturnValueOnce([
            { activeSubscription: 'fake-active-subscription' }, false] as any)

        const useRouterMocked = mocked(useRouter)
        const pushMock = jest.fn()

        useRouterMocked.mockReturnValueOnce({
            push: pushMock
        } as any)


        render(<PostPreview post={{
            slug: 'my-new-post',
            title: 'My New Post',
            content: '<p>Post excerprt<p>',
            updatedAt: '10 de Abril',
        }} />)

        expect(pushMock).toHaveBeenCalledWith('/posts/my-new-post')
    })

    it('loads initial data', async () => {

        const getPrismicClientMocked = mocked(getPrismicClient)
        getPrismicClientMocked.mockReturnValueOnce({
            getByUID: jest.fn().mockResolvedValueOnce({
                data: {
                    title: [{ type: 'heading', text: 'My New Post' }],
                    content: [{ type: 'paragraph', text: 'Post content' }],
                },
                last_publication_date: '04-01-2021'
            })
        } as any)

        const response = await getStaticProps({ params: { slug: 'my-new-post' } } as any)
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
