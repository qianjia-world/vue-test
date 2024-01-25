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
            <div class="nav"></div>
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
        <div class="article" :class="{
            'open':!isMenuToggle
        }">article</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
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
                    console.log('上怡');
                    vm.isPhoneHeaderStatus = 1

                } else {
                    console.log('下滑');
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
        }
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
    display: none;
    background-color: #F7F7F7;
    width: 100%;
    min-height: 100vh;
    justify-content: center;
    align-items: center;
    font-size: 64px;
    color: black;
}
.open{
    display: flex;
}
.close{
    display: none;
}
</style>
