import React from 'react'
import { NavLink } from 'react-router-dom'

import './Header.scss'

class Header extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            loading: true,
        }

        fetch(process.env.REACT_APP_ACCOUNTS_API_BASE_URL + "user", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("oauth.token")
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                this.setState({ user: data.result, loading: false })
            } else {
                this.setState({ loading: false })
            }
        })
    }

    redirectAuthentication = () => {
        window.location.href = process.env.REACT_APP_ACCOUNTS_BASE_URL + "oauth/authenticate/?redirect=" + encodeURI(process.env.REACT_APP_BASE_URL + "oauth") + "&method=signin&from=code.jakobi.io"
    }

    render() {
        return <header className="header">
            <div className="container flex">
                <NavLink to="/" className="header-brand">
                    <svg width="129" height="57" viewBox="0 0 129 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M51.58 22L48.5 16.56H47.18V22H44.38V8.04H49.62C50.7 8.04 51.62 8.23333 52.38 8.62C53.14 8.99333 53.7067 9.50667 54.08 10.16C54.4667 10.8 54.66 11.52 54.66 12.32C54.66 13.24 54.3933 14.0733 53.86 14.82C53.3267 15.5533 52.5333 16.06 51.48 16.34L54.82 22H51.58ZM47.18 14.46H49.52C50.28 14.46 50.8467 14.28 51.22 13.92C51.5933 13.5467 51.78 13.0333 51.78 12.38C51.78 11.74 51.5933 11.2467 51.22 10.9C50.8467 10.54 50.28 10.36 49.52 10.36H47.18V14.46ZM67.6525 10.92V22H64.8325V20.6C64.4725 21.08 63.9992 21.46 63.4125 21.74C62.8392 22.0067 62.2125 22.14 61.5325 22.14C60.6658 22.14 59.8992 21.96 59.2325 21.6C58.5658 21.2267 58.0392 20.6867 57.6525 19.98C57.2792 19.26 57.0925 18.4067 57.0925 17.42V10.92H59.8925V17.02C59.8925 17.9 60.1125 18.58 60.5525 19.06C60.9925 19.5267 61.5925 19.76 62.3525 19.76C63.1258 19.76 63.7325 19.5267 64.1725 19.06C64.6125 18.58 64.8325 17.9 64.8325 17.02V10.92H67.6525ZM76.5552 10.76C77.8752 10.76 78.9418 11.18 79.7552 12.02C80.5685 12.8467 80.9752 14.0067 80.9752 15.5V22H78.1752V15.88C78.1752 15 77.9552 14.3267 77.5152 13.86C77.0752 13.38 76.4752 13.14 75.7152 13.14C74.9418 13.14 74.3285 13.38 73.8752 13.86C73.4352 14.3267 73.2152 15 73.2152 15.88V22H70.4152V10.92H73.2152V12.3C73.5885 11.82 74.0618 11.4467 74.6352 11.18C75.2218 10.9 75.8618 10.76 76.5552 10.76ZM86.8978 13.22V18.58C86.8978 18.9533 86.9845 19.2267 87.1578 19.4C87.3445 19.56 87.6511 19.64 88.0778 19.64H89.3778V22H87.6178C85.2578 22 84.0778 20.8533 84.0778 18.56V13.22H82.7578V10.92H84.0778V8.18H86.8978V10.92H89.3778V13.22H86.8978ZM92.8117 9.6C92.3184 9.6 91.9051 9.44667 91.5717 9.14C91.2517 8.82 91.0917 8.42667 91.0917 7.96C91.0917 7.49333 91.2517 7.10667 91.5717 6.8C91.9051 6.48 92.3184 6.32 92.8117 6.32C93.3051 6.32 93.7117 6.48 94.0317 6.8C94.3651 7.10667 94.5317 7.49333 94.5317 7.96C94.5317 8.42667 94.3651 8.82 94.0317 9.14C93.7117 9.44667 93.3051 9.6 92.8117 9.6ZM94.1917 10.92V22H91.3917V10.92H94.1917ZM110.718 10.76C112.078 10.76 113.171 11.18 113.998 12.02C114.838 12.8467 115.258 14.0067 115.258 15.5V22H112.458V15.88C112.458 15.0133 112.238 14.3533 111.798 13.9C111.358 13.4333 110.758 13.2 109.998 13.2C109.238 13.2 108.631 13.4333 108.178 13.9C107.738 14.3533 107.518 15.0133 107.518 15.88V22H104.718V15.88C104.718 15.0133 104.498 14.3533 104.058 13.9C103.618 13.4333 103.018 13.2 102.258 13.2C101.485 13.2 100.871 13.4333 100.418 13.9C99.9781 14.3533 99.7581 15.0133 99.7581 15.88V22H96.9581V10.92H99.7581V12.26C100.118 11.7933 100.578 11.4267 101.138 11.16C101.711 10.8933 102.338 10.76 103.018 10.76C103.885 10.76 104.658 10.9467 105.338 11.32C106.018 11.68 106.545 12.2 106.918 12.88C107.278 12.24 107.798 11.7267 108.478 11.34C109.171 10.9533 109.918 10.76 110.718 10.76ZM128.215 16.22C128.215 16.62 128.188 16.98 128.135 17.3H120.035C120.102 18.1 120.382 18.7267 120.875 19.18C121.368 19.6333 121.975 19.86 122.695 19.86C123.735 19.86 124.475 19.4133 124.915 18.52H127.935C127.615 19.5867 127.002 20.4667 126.095 21.16C125.188 21.84 124.075 22.18 122.755 22.18C121.688 22.18 120.728 21.9467 119.875 21.48C119.035 21 118.375 20.3267 117.895 19.46C117.428 18.5933 117.195 17.5933 117.195 16.46C117.195 15.3133 117.428 14.3067 117.895 13.44C118.362 12.5733 119.015 11.9067 119.855 11.44C120.695 10.9733 121.662 10.74 122.755 10.74C123.808 10.74 124.748 10.9667 125.575 11.42C126.415 11.8733 127.062 12.52 127.515 13.36C127.982 14.1867 128.215 15.14 128.215 16.22ZM125.315 15.42C125.302 14.7 125.042 14.1267 124.535 13.7C124.028 13.26 123.408 13.04 122.675 13.04C121.982 13.04 121.395 13.2533 120.915 13.68C120.448 14.0933 120.162 14.6733 120.055 15.42H125.315Z" fill="white" fill-opacity="0.8"/>
                        <path d="M5.434 31.79V36.34H11.544V39.226H5.434V44.036H12.324V47H1.794V28.826H12.324V31.79H5.434ZM23.5879 47L20.6239 42.528L17.9979 47H14.0979L18.8039 39.772L14.0459 32.596H18.1539L21.0919 37.042L23.7439 32.596H27.6439L22.9119 39.772L27.6959 47H23.5879ZM28.7369 39.798C28.7369 38.3073 29.0402 37.0073 29.6469 35.898C30.2536 34.7713 31.0942 33.9047 32.1689 33.298C33.2436 32.674 34.4742 32.362 35.8609 32.362C37.6462 32.362 39.1196 32.8127 40.2809 33.714C41.4596 34.598 42.2482 35.846 42.6469 37.458H38.7209C38.5129 36.834 38.1576 36.3487 37.6549 36.002C37.1696 35.638 36.5629 35.456 35.8349 35.456C34.7949 35.456 33.9716 35.8373 33.3649 36.6C32.7582 37.3453 32.4549 38.4113 32.4549 39.798C32.4549 41.1673 32.7582 42.2333 33.3649 42.996C33.9716 43.7413 34.7949 44.114 35.8349 44.114C37.3082 44.114 38.2702 43.4553 38.7209 42.138H42.6469C42.2482 43.698 41.4596 44.9373 40.2809 45.856C39.1022 46.7747 37.6289 47.234 35.8609 47.234C34.4742 47.234 33.2436 46.9307 32.1689 46.324C31.0942 45.7 30.2536 44.8333 29.6469 43.724C29.0402 42.5973 28.7369 41.2887 28.7369 39.798ZM58.7035 39.486C58.7035 40.006 58.6689 40.474 58.5995 40.89H48.0695C48.1562 41.93 48.5202 42.7447 49.1615 43.334C49.8029 43.9233 50.5915 44.218 51.5275 44.218C52.8795 44.218 53.8415 43.6373 54.4135 42.476H58.3395C57.9235 43.8627 57.1262 45.0067 55.9475 45.908C54.7689 46.792 53.3215 47.234 51.6055 47.234C50.2189 47.234 48.9709 46.9307 47.8615 46.324C46.7695 45.7 45.9115 44.8247 45.2875 43.698C44.6809 42.5713 44.3775 41.2713 44.3775 39.798C44.3775 38.3073 44.6809 36.9987 45.2875 35.872C45.8942 34.7453 46.7435 33.8787 47.8355 33.272C48.9275 32.6653 50.1842 32.362 51.6055 32.362C52.9749 32.362 54.1969 32.6567 55.2715 33.246C56.3635 33.8353 57.2042 34.676 57.7935 35.768C58.4002 36.8427 58.7035 38.082 58.7035 39.486ZM54.9335 38.446C54.9162 37.51 54.5782 36.7647 53.9195 36.21C53.2609 35.638 52.4549 35.352 51.5015 35.352C50.6002 35.352 49.8375 35.6293 49.2135 36.184C48.6069 36.7213 48.2342 37.4753 48.0955 38.446H54.9335ZM65.0004 34.676C65.4684 34.0173 66.1097 33.4713 66.9244 33.038C67.7564 32.5873 68.7011 32.362 69.7584 32.362C70.9891 32.362 72.0984 32.6653 73.0864 33.272C74.0917 33.8787 74.8804 34.7453 75.4524 35.872C76.0417 36.9813 76.3364 38.2727 76.3364 39.746C76.3364 41.2193 76.0417 42.528 75.4524 43.672C74.8804 44.7987 74.0917 45.674 73.0864 46.298C72.0984 46.922 70.9891 47.234 69.7584 47.234C68.7011 47.234 67.7651 47.0173 66.9504 46.584C66.1531 46.1507 65.5031 45.6047 65.0004 44.946V53.864H61.3604V32.596H65.0004V34.676ZM72.6184 39.746C72.6184 38.8793 72.4364 38.134 72.0724 37.51C71.7257 36.8687 71.2577 36.3833 70.6684 36.054C70.0964 35.7247 69.4724 35.56 68.7964 35.56C68.1377 35.56 67.5137 35.7333 66.9244 36.08C66.3524 36.4093 65.8844 36.8947 65.5204 37.536C65.1737 38.1773 65.0004 38.9313 65.0004 39.798C65.0004 40.6647 65.1737 41.4187 65.5204 42.06C65.8844 42.7013 66.3524 43.1953 66.9244 43.542C67.5137 43.8713 68.1377 44.036 68.7964 44.036C69.4724 44.036 70.0964 43.8627 70.6684 43.516C71.2577 43.1693 71.7257 42.6753 72.0724 42.034C72.4364 41.3927 72.6184 40.63 72.6184 39.746ZM83.2195 35.586V42.554C83.2195 43.0393 83.3322 43.3947 83.5575 43.62C83.8002 43.828 84.1988 43.932 84.7535 43.932H86.4435V47H84.1555C81.0875 47 79.5535 45.5093 79.5535 42.528V35.586H77.8375V32.596H79.5535V29.034H83.2195V32.596H86.4435V35.586H83.2195ZM90.9076 30.88C90.2662 30.88 89.7289 30.6807 89.2956 30.282C88.8796 29.866 88.6716 29.3547 88.6716 28.748C88.6716 28.1413 88.8796 27.6387 89.2956 27.24C89.7289 26.824 90.2662 26.616 90.9076 26.616C91.5489 26.616 92.0776 26.824 92.4936 27.24C92.9269 27.6387 93.1436 28.1413 93.1436 28.748C93.1436 29.3547 92.9269 29.866 92.4936 30.282C92.0776 30.6807 91.5489 30.88 90.9076 30.88ZM92.7016 32.596V47H89.0616V32.596H92.7016ZM102.694 47.234C101.307 47.234 100.059 46.9307 98.9499 46.324C97.8406 45.7 96.9652 44.8247 96.3239 43.698C95.6999 42.5713 95.3879 41.2713 95.3879 39.798C95.3879 38.3247 95.7086 37.0247 96.3499 35.898C97.0086 34.7713 97.9012 33.9047 99.0279 33.298C100.155 32.674 101.411 32.362 102.798 32.362C104.185 32.362 105.441 32.674 106.568 33.298C107.695 33.9047 108.579 34.7713 109.22 35.898C109.879 37.0247 110.208 38.3247 110.208 39.798C110.208 41.2713 109.87 42.5713 109.194 43.698C108.535 44.8247 107.634 45.7 106.49 46.324C105.363 46.9307 104.098 47.234 102.694 47.234ZM102.694 44.062C103.353 44.062 103.968 43.906 104.54 43.594C105.129 43.2647 105.597 42.7793 105.944 42.138C106.291 41.4967 106.464 40.7167 106.464 39.798C106.464 38.4287 106.1 37.38 105.372 36.652C104.661 35.9067 103.786 35.534 102.746 35.534C101.706 35.534 100.831 35.9067 100.12 36.652C99.4266 37.38 99.0799 38.4287 99.0799 39.798C99.0799 41.1673 99.4179 42.2247 100.094 42.97C100.787 43.698 101.654 44.062 102.694 44.062ZM120.86 32.388C122.576 32.388 123.963 32.934 125.02 34.026C126.077 35.1007 126.606 36.6087 126.606 38.55V47H122.966V39.044C122.966 37.9 122.68 37.0247 122.108 36.418C121.536 35.794 120.756 35.482 119.768 35.482C118.763 35.482 117.965 35.794 117.376 36.418C116.804 37.0247 116.518 37.9 116.518 39.044V47H112.878V32.596H116.518V34.39C117.003 33.766 117.619 33.2807 118.364 32.934C119.127 32.57 119.959 32.388 120.86 32.388Z" fill="white"/>
                        <rect x="1" y="7" width="33" height="15" fill="#1A73E8"/>
                    </svg>
                </NavLink>
                <div className="header-right">
                    <div className="header-navigation">
                        <NavLink to="/code" activeClassName="is-active" className="navigation-item">Public Code</NavLink>
                        <NavLink to="/my-code" activeClassName="is-active" className="navigation-item">My Code</NavLink>
                    </div>
                    <div className="header-profile">
                        {!this.state.loading && this.state.user !== null &&
                            <a href={process.env.REACT_APP_ACCOUNTS_BASE_URL + "@" + this.state.user.username} className="user">
                                <span className="user-username">{this.state.user.username ?? this.state.user.email}</span>
                                <div className="user-profile-image" style={{backgroundImage: "url('" + this.state.user.profile_picture_url + "')"}}/>
                            </a>
                        }
                        {!this.state.loading && this.state.user === null &&
                            <div className="cta-login" onClick={() => { this.redirectAuthentication() }}>
                                <span>Sign In</span>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </header>
    }
}

export default Header;