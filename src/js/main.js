import modal from './modules/modal';
import slider from './modules/slider';

window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    modal();
    slider('.main-slider-item', 'vertical');
    slider('.feedback-slider-item', 'horizontal', '.main-prev-btn', '.main-next-btn');
});
