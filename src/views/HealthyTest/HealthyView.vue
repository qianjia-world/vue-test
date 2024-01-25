<template>
    <div class="wrap">
        <div class="ad">
            <div class="ad-item"></div>
        </div>
        <nav class="nav">
            <div class="nav__menu">
                <a class="nav__item">康健</a>
                <a class="nav__item">大人社團</a>
                <a class="nav__item">康健知識庫</a>
                <a class="nav__item">康健線上學習</a>
                <a class="nav__item">康健嚴選</a>
                <a class="nav__item">康健出版</a>
                <a class="nav__item">康健影音</a>
                <a class="nav__item">書香花園</a>
            </div>
        </nav>
        <header class="header">
            <div class="container">
                <div class="header__menu-toggle" :class="{'close': isPhoneHeaderStatus == 2}">
                    <!-- v-if -->
                    <img class="header__menu-toggle--img" src="../../assets/healthy-test/menu.svg" alt="" srcset="" v-if="!isMenuToggle" @click="() => handleMenuToggle(true)">
                    
                    <!-- v-else -->
                    <img class="header__menu-toggle--img" src="../../assets/healthy-test/menu-close.svg" alt="" srcset="" v-else @click="() => handleMenuToggle(false)">
                </div>
                <div class="logo" :class="{'close': isPhoneHeaderStatus == 2}">logo</div>
                <div class="banner">banner 特開</div>
                <div class="search" :class="{'open': isPhoneHeaderStatus == 2}">
                    <select class="search__option">
                        <option value="option1" selected>全部</option>
                        <option value="option2">選項 2</option>
                        <option value="option3">選項 3</option>
                    </select>
                    <div class="search__line"></div>
                    <input class="search__input" type="text" :placeholder="isPhone? '' : '請輸入關鍵字'">
                    <img class="search__btn" src="../../assets/healthy-test/search.svg" alt="" srcset="" @click="handleSearchClick">
                </div>
                <div class="add-line" :class="{'open': (isPhoneHeaderStatus == 2) && isLineToggle}">加入 LINE</div>
                <div class="auth" :class="{'close':isPhoneHeaderStatus == 2}">
                    <span class="auth__text">會員限定</span>
                    <button class="auth__btn auth__btn--login">登入</button>
                    <button class="auth__btn auth__btn--add">加入會員</button>
                </div>
            </div>
        </header>
        <div class="menu" :class="{
            'open': isMenuToggle
        }">menu</div>
        <div class="article">
            <div class="article__item" :class="{
                'close':isMenuToggle
            }">
                <div class="article__carousel">
                    <swiper
                        :effect="'cards'"
                        :modules="modules"
                        class="mySwiper"
                        :navigation="true"
                    >
                        <swiper-slide><img class="article__carousel__item" src="https://picsum.photos/339/184" alt="" srcset=""></swiper-slide>
                        <swiper-slide><img class="article__carousel__item" src="https://picsum.photos/339/184" alt="" srcset=""></swiper-slide>
                        <swiper-slide><img class="article__carousel__item" src="https://picsum.photos/339/184" alt="" srcset=""></swiper-slide>
                    </swiper>
                </div>
                <div class="article__content">
                    <div class="article__content__item">
                        <div class="article__info">
                            <a class="article__video" href="">
                                <img src="../../assets/healthy-test/article-video.svg" alt="">影音
                            </a>
                            <span class="article__tag">#不分癌</span>
                            <span class="article__tag">#常見治療問題</span>
                            <span class="article__tag">#常見問題</span>
                        </div>
                        <div class="article__title">疫情期間，癌症化療病人尿不出來又怕掛急診染疫，怎麼辦？</div>
                        <a :href="data.url" class="article__btn">立即閱讀</a>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import axios from 'axios';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-cards';

// import required modules
import { EffectCards } from 'swiper/modules';
import { Pagination, Navigation } from 'swiper/modules';
export default {
    components: {
      Swiper,
      SwiperSlide,
    },
    setup() {
      return {
        modules: [Pagination,EffectCards, Navigation],
      };
    },
    data() {
        return {
            data:{
                url:'',
                description:''
            },
            isMenuToggle: false,
            isPhoneHeaderStatus: 1,//1,2
            isPhone:true,
            isLineToggle:true
        }
    },
    methods:{
        handleMenuToggle(status){
            console.log(status);
            this.isMenuToggle = status
        },
        handleScroll(){
            //需要減少操作那個 debounce
            let prevY = 0
            let vm = this
            return function(){
                if (prevY > window.scrollY){
                    vm.isPhoneHeaderStatus = 1

                } else {
                    vm.isPhoneHeaderStatus = 2
                    vm.isLineToggle = true

                }
                prevY = window.scrollY
            }
        },
        handleSearchClick(){
            this.isLineToggle = false
        },
        isMobileDevice() {
            if (window.innerWidth < 768) {
                return true
            }
            // 获取用户代理字符串
            const userAgent = navigator.userAgent;

            // 使用正则表达式检查用户代理字符串中是否包含常见的移动设备关键词
            const mobileKeywords = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
            
            // 如果用户代理字符串中包含移动设备关键词，则返回 true，否则返回 false
            return mobileKeywords.test(userAgent);
        },
        fetchData(){
            axios.get(`https://newsapi.org/v2/top-headlines/sources?apiKey=42bd4348393e4b7a8ab3cc7574c1a2b3&country=ca`)
            .then( (response) => {
                console.log(response)
                this.data.url = response.data.sources[0].url
                this.data.description = response.data.sources[0].description
            })
            .catch( (error) => console.log(error))
        }
    },
    created(){
        this.fetchData()
    },
    mounted(){
        this.isPhone = this.isMobileDevice()
        if (this.isPhone) {
            window.addEventListener("scroll", this.handleScroll());
        }
    },
    beforeDestroy() {
        if (this.isPhone) {
            window.removeEventListener("scroll", this.handleScroll());
        }
        
    },
}
</script>

<style scoped lang="scss">
/* Add your custom styles here */
@import "../../assets/scss/breakpoint.scss";
.wrap{
    position: relative;
    width:100%;
    min-height:100vh;
    background-color: white;
}
.ad{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px 0;
    background-color: #F9F8F7;
}

.ad-item{
    width: 300px;
    height: 250px;
    background-image: url("https://picsum.photos/300/250");
    @include md{
        width: 600px;
        background-image: url("https://picsum.photos/600/250");
    }
    @include lg{
        width: 970px;
        background-image: url("https://picsum.photos/970/250");
    }
}
.nav{
    display: none;
    @include md{
        display: block;
    }
    background-color: #B38E5B;
}

.nav__menu{
    color: white;
    gap: 12px;
    min-height: 32px;
    max-width: 1246px;
    margin: auto;
    width: 100%;
    display: flex;
    justify-content: end;
    align-items: center;
    padding: 0px 18px;
}

.nav__item{
    padding: 4px 8px;
    cursor: pointer;
}
.header{
    position: sticky;
    top: 0;
    border-bottom: 1px solid #DDDDDD;
    background-color: white;
    z-index: 10;
}
.container{
    min-height: 60px;
    max-width: 1246px;
    margin: auto;
    width: 100%;
    padding: 0px 18px;
    display: flex;
    align-items: center;
    @include md{
        height: 93px;
    }
}
.header__menu-toggle{
    display: flex;
    justify-content: center;
    align-items: center;
}

.logo{
    width: 136px;
    height: 29px;
    color: white;
    background-color: black;
    text-align: center;
    line-height: 29px;
    font-weight: 500;
    margin: auto auto auto 12px;
    @include md{
        width: 200px;
        height: 48px;
        line-height: 48px;
        margin: auto 24px auto 24px;
    }
}

.banner{
    display: none;
    @include xl{
        display: block;
        width: 192px;
        height: 48px;
        line-height: 48px;
        text-align: center;
        background-color: #CCCCCC;
        color: #ffffff;
        border-radius: 12px;
    }

}

.search{
    display: none;
    position: relative;
    align-items: center;
    max-width: 400px;
    width: 100%;
    height: 40px;
    border: 1px solid #DDDDDD;
    border-radius: 20px;
    margin: 0px auto;
    @include lg{
        display: flex;
    }
}

.search__option{
    border: none;
    width: 89px;
    height: 32px;
    font-size: 16px;
    line-height: 32px;
    margin: 0px 8px 0px 16px;
    &:focus-visible{
        outline: none;
    }
}
.search__line{
    width: 1px;
    height: 24px;
    background-color: #DDDDDD;
    margin: 0px 12px;
}
.search__input{
    max-width: 212px;
    width: 100%;
    border: none;
    display: block;
    font-size: 16px;
    line-height: 16px;
    margin-right: 10px;
    letter-spacing: 0.5px;
    &:focus-visible{
        outline: none;
    }
    &::placeholder{
        color: #B7B7B7;
    }
}

.search__btn{
    position: absolute;
    width: 28px;
    height: 28px;
    top: 50%;
    right: 12px;
    transform: translate(0%, -50%);
    cursor: pointer;
}
.add-line{
    display: none;
    margin-left: 16px;
    text-wrap: nowrap;
    justify-content: center;
    align-items: center;
    padding: 4px 8px;
    color: white;
    border-radius: 46px;
    background-color: #07B53B;
}
.auth{
    margin-left: auto;
}
.auth__text{
    display: none;
    @include md{
        display: inline;
        font-size: 16px;
        line-height: 24px;
        letter-spacing: 1px;
        color: black;
        margin-right: 8px;
    }
}
.auth__btn{
    border-radius: 46px;
    padding: 7px 16px;
    font-size: 16px;
    line-height: 16px;
    font-weight: 500;
    cursor: pointer;
    margin-left: 8px;
}
.auth__btn--login{
    border: 1px solid #FF9122;
    color: #FF9122 ;
    background-color: white;
}
.auth__btn--add{
    display: none;
    @include md{
        border: 1px solid #FF9122;
        color: white ;
        background-color: #FF9122;
        display: inline;
    }
}
.header__menu-toggle--img{
    width: 24px;
    height: 24px;
    cursor: pointer;
    @include md{
        width: 36px;
        height: 36px;
    }
}

.menu{
    display: none;
    background-color: #F7F7F7;
    width: 100%;
    min-height: 100vh;
    justify-content: center;
    align-items: center;
    font-size: 64px;
    color: black;
}
.article{
    background-color: #F7F7F7;

}
.article__item{
    max-width: 1246px;
    margin: auto;
    width: 100%;
    display: flex;
    flex-flow: column;
    gap: 16px 0px;
    justify-content: center;
    align-items: center;
    color: black;
    padding: 32px 0px;
    margin: auto;
    @include md{
        flex-direction: row-reverse;
    }
}
.article__carousel{
    flex: 8;
    width: 100%;
    overflow: hidden;
}
.article__carousel__item{
    width: 100%;
    height: 100%;
}


.article__info{
    display: flex;
    gap: 0 12px;
}

.article__video{
    height: 20px;
    padding: 0px 8px;
    display: flex;
    font-size: 14px;
    justify-content: center;
    align-items: center;
    background-color: rgba(34, 34, 34, 0.6);
    border-radius: 12px;
    color: white;
    text-decoration: none;
}
.article__tag{
    font-size: 14px;
    line-height: 20px;
    color: #B38E5B;
}
.article__content{
    flex: 3;
}

.article__content__item{
    max-width: 412px;
    width: 100%;
    margin: 0 auto;
    text-align: center;
}
.article__title{
    text-align: justify;
    font-size: 28px;
    line-height: 42px;
    font-weight: 700;
    letter-spacing: 1px;
    max-width: 327px;
    width: 100%;
    margin-top: 16px;
}

.article__btn{
    margin-top: 48px;
    border-radius: 46px;
    padding: 12px 48px;
    font-size: 18px;
    line-height: 27px;
    font-weight: 700;
    letter-spacing: 1px;
    cursor: pointer;
    border: 1px solid #FF9122;
    color: #FF9122 ;
    background-color: white;
    display: block;
    max-width: 176px;
    margin: 48px auto 0 auto;
}
.open{
    display: flex;
}
.close{
    display: none;
}

.swiper {
  width: 327px;
  height: 184px;
  @include xl{
    width: 740px;
    height: 432px;
  }
}

.swiper-slide {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  font-size: 22px;
  font-weight: bold;
  color: #fff;
}

:deep .swiper-button-next{
    width: 36px;
    height: 36px;

}
:deep .swiper-button-prev{
    width: 36px;
    height: 36px;

}
:deep .swiper-button-next::after{
    font-size: 0px;
    width: 36px;
    height: 36px;
    background-image: url('../../assets/healthy-test/arrow-swiper.svg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
}

:deep .swiper-button-prev::after{
    font-size: 0px;
    width: 36px;
    height: 36px;
    background-image: url('../../assets/healthy-test/arrow-swiper.svg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    transform: rotate(180deg);
}
</style>
