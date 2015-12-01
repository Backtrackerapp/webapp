angular.module('best-trips')
.controller('bestListController', function($scope, $location, Featured, $sce, $state, Map, Journey){
    if($location.path() === '/best_trips'){
        $scope.show = true;
    } else {
        $scope.show = false;
    }

    $scope.featured_journeys = null;
    $scope.top_image = null;
    $scope.selected = null;
    $scope.youtubeUrl = null;
    $scope.mode = null;
    $scope.width = '100%';

    $scope.showFeatured = function(feat){
        $state.go('map.besttrips', {id:feat.id});
        $scope.selected = feat;
        $scope.top_image = 'url('+ feat.image.ipad +')';
        if(feat.videos.length > 0){
            $scope.youtubeUrl = $sce.trustAsResourceUrl(feat.videos[0].link.replace('watch?v=','embed/').replace('https', 'http'));
        } else {
            $scope.youtubeUrl = null;
        }
        $('.BestTrips').animate({
            'scrollTop': 0
        }, 500);
        $scope.mode = 'on';
        $scope.width = ($scope.featured_journeys.length * 314) + 'px';
    }

    $scope.showJourney = function(){
        if($scope.selected){
            $state.go('map.journey', {id:$scope.selected.journey.id});
            $scope.back();
        }
    }

    $scope.back = function(){
        $scope.selected =
            $scope.top_image =
                $scope.youtubeUrl =
                    $scope.mode = null;
        $scope.width = '100%';
    }

    $scope.$on('tabChanged', function(test, args){
        if(args.tab === 'best trips'){
            $scope.show = true;
            if(!$state.params.id){
                $scope.back();
            } else {
                $scope.featured_journeys.forEach(function(j){
                    if(j.id+"" === $state.params.id) {
                        $scope.showFeatured(j);
                    }
                })
            }
        } else {
            $scope.show = false;
        }
    });

    function getJourneys(){
        Featured.list(null, function(journeys){
            $scope.featured_journeys = journeys;
            if($state.params.id){
                journeys.forEach(function(j){
                    if(j.id+"" === $state.params.id) {
                        $scope.showFeatured(j);
                    }
                })
            }
        }, function(error){
            console.error("something went wrong in featured journeys");
        });
    }

    getJourneys();

});
