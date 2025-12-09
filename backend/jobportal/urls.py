from django.urls import path, include
from django.contrib import admin
from django.views.generic import RedirectView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('core.urls')),  # ✅ only once
    path('', RedirectView.as_view(url='/api/jobs/', permanent=False)),  # root redirects to jobs
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
