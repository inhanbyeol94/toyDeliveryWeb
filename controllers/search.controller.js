const SearchService = require('../services/search.service');

class SearchController {
    searchService = new SearchService();

    keyword = async (req, res) => {
        const { search } = req.body;

        try {
            const searchKeywords = await this.searchService.keyword(search);

            res.status(200).json({ search: searchKeywords });
        } catch (err) {
            return res.status(500).json({ errorMessage: '검색에 실패했습니다.' });
        }
    };

    menu = async (req, res) => {
        const { search } = req.body;

        try {
            const searchMenu = await this.searchService.menu(search);

            res.status(200).json({ search: searchMenu });
        } catch (err) {
            return res.status(500).json({ errorMessage: '검색에 실패했습니다.' });
        }
    };

    //일단 보류
    category = async (req, res) => {
        const { search } = req.body;

        try {
            const searchCategory = await this.searchService.category(search);

            res.status(200).json({ search: searchCategory });
        } catch (err) {
            return res.status(500).json({ errorMessage: '검색에 실패했습니다.' });
        }
    };
}

module.exports = SearchController;
