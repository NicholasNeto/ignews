import { render, screen, fireEvent } from '@testing-library/react'
import { useSession, signIn } from 'next-auth/client'
import { mocked } from 'ts-jest/utils'
import { useRouter } from 'next/router'
import { SubscribeButton } from '.'

jest.mock('next-auth/client')
jest.mock('next/router')


describe('SubscribeButton component', () => {
    it('renders correctly', () => {
        
        const useSessionMocked = mocked(useSession)
        useSessionMocked.mockReturnValueOnce([null, false])

        render(<SubscribeButton />)
        expect(screen.getByText('Subscribe now')).toBeInTheDocument()
    })

    it('redirects user to sign in when in when not authenticated', () => {
        const signInMocked = mocked(signIn)
        const useSessionMocked = mocked(useSession)
        
        useSessionMocked.mockReturnValueOnce([null, false])

        render(<SubscribeButton />)
        const subscribeButton = screen.getByText('Subscribe now')
        fireEvent.click(subscribeButton)

        expect(signInMocked).toHaveBeenCalled()
    })

    it('redirects to posts when user already has a subscription', () => {
        const useRouterMocked = mocked(useRouter)
        const useSessionMocked = mocked(useSession)
        const pushMock = jest.fn()


        useRouterMocked.mockReturnValueOnce({
            push: pushMock
        } as any)

        useSessionMocked.mockReturnValueOnce([
            {
                user: {
                    name: 'John Doe',
                    email: 'john@doe.com'
                },
                activeSubscription: 'fake-active-subscription',
                expires: 'fake-expires'
            },
            false
        ])

        render(<SubscribeButton />)
        const subscribeButton = screen.getByText('Subscribe now')
        fireEvent.click(subscribeButton)

        expect(pushMock).toHaveBeenCalled()
        expect(pushMock).toHaveBeenCalledWith('/posts')
    })
})

