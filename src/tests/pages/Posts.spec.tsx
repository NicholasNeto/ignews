import { render, screen } from '@testing-library/react'
import { getPrismicClient } from '../../services/prismic'
import { mocked } from 'ts-jest/utils'
import Posts, { getStaticProps } from '../../pages/posts'

const posts = [
    {
        slug: 'my-new-post',
        title: 'My New Post',
        excerpt: 'Post excerprt',
        updatedAt: '10 de Abril',
    }
]

jest.mock('../../services/prismic')


describe('Posts page', () => {
    it('renders correctly', () => {
        render(<Posts posts={posts} />)

        expect(screen.getByText('My New Post')).toBeInTheDocument()
    })


    it('loads initial data', async () => {
        const getPrismicClientMocked = mocked(getPrismicClient)

        getPrismicClientMocked.mockReturnValueOnce({
            query: jest.fn().mockResolvedValueOnce({
                results: [
                    {
                        uid: 'my-new-post',
                        data: {
                            title: [{ type: 'heading', text: 'My New Post' }],
                            content: [{ type: 'paragraph', text: 'Post excerprt' }],
                        },
                        last_publication_date: '04-01-2021'
                    }
                ]
            })
        } as any)

        const response = await getStaticProps({})

        expect(response).toEqual(
            expect.objectContaining({
                props: {
                    posts: [{
                        slug: 'my-new-post',
                        title: 'My New Post',
                        excerpt: 'Post excerprt',
                        updatedAt: '01 de abril de 2021',
                    }]
                }
            })
        )
    })
})
