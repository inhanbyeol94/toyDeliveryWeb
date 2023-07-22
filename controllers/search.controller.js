const SearchService = require('../services/search.service');

class SearchController {
    searchService = new SearchService();

    /** 키워드 검색시 해당 레스토랑 전체 조회 */
    keyword = async (req, res) => {
        try {
            const { search } = req.params;

            //인코딩을 받은 값을 디코딩
            const decodeSearch = decodeURI(decodeURIComponent(search));

            const { status, message, result } = await this.searchService.keyword(decodeSearch);

            res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.error(error);
            return res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    };

    /** 메뉴 검색시 해당 레스토랑 전체 조회 */
    menu = async (req, res) => {
        try {
            const { search } = req.params;

            //인코딩을 받은 값을 디코딩
            const decodeSearch = decodeURI(decodeURIComponent(search));

            const { status, message, result } = await this.searchService.keyword(decodeSearch);

            res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.error(error);
            return res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    };

    /** 카테고리 검색(선택)시 해당 레스토랑 전체 조회 */
    category = async (req, res) => {
        try {
            const { search } = req.params;

            //인코딩을 받은 값을 디코딩
            const decodeSearch = decodeURI(decodeURIComponent(search));

            const { status, message, result } = await this.searchService.keyword(decodeSearch);

            res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.error(error);
            return res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    };
}

module.exports = SearchController;
