from django.core.paginator import Paginator


class Pagination:
    def __init__(self, objs, page, direction):
        self.objs = objs
        self.page = page
        self.direction = direction

    def paginate(self):
        next_page = 1
        paginator = Paginator(self.objs, 5)

        if self.direction == 'prev' and int(self.page) > 1:
            next_page = int(self.page) - 1
        if self.direction == 'next' and int(self.page) < paginator.num_pages:
            next_page = int(self.page) + 1

        cur_page = paginator.page(next_page)

        return {
            'page': next_page,
            'items': cur_page.object_list,
            'num_of_pages': paginator.num_pages
        }
