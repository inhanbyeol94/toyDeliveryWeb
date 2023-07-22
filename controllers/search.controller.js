const SearchService = require('../services/search.service');

class SearchController {
    searchService = new SearchService();

    /** 키워드 검색시 해당 레스토랑 전체 조회 */
    keyword = async (req, res) => {
        const { search } = req.params;

        try {
            //인코딩을 받은 값을 디코딩
            const decodeSearch = decodeURI(decodeURIComponent(search));

            const { status, message, result } = await this.searchService.keyword(decodeSearch);

            res.status(status).json({ message, result });
        } catch (err) {
            return res.status(500).json({ message: '검색에 실패했습니다.' });
        }
    };

    /** 메뉴 검색시 해당 레스토랑 전체 조회 */
    menu = async (req, res) => {
        const { search } = req.params;

        try {
            //인코딩을 받은 값을 디코딩
            const decodeSearch = decodeURI(decodeURIComponent(search));
            const { status, message, result } = await this.searchService.menu(decodeSearch);

            res.status(status).json({ message, result });
        } catch (err) {
            return res.status(500).json({ message: '검색에 실패했습니다.' });
        }
    };

    /** 카테고리 검색(선택)시 해당 레스토랑 전체 조회 */
    category = async (req, res) => {
        const { search } = req.params;

        try {
            //인코딩을 받은 값을 디코딩
            const decodeSearch = decodeURI(decodeURIComponent(search));
            const { status, message, result } = await this.searchService.category(decodeSearch);

            res.status(status).json({ message, result });
        } catch (err) {
            return res.status(500).json({ message: '검색에 실패했습니다.' });
        }
    };
}

module.exports = SearchController;
