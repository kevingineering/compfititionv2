using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Core.Specifications
{
  public interface ISpecification<T>
  {
    Expression<Func<T, bool>> Criteria { get; }
    //this is not possible without including EntityFrameworkCore in our core project
    //List<Func<IQueryable<T>, IIncludableQueryable<T, object>>> Includes { get; }
    List<Expression<Func<T, object>>> Includes { get; }
    Expression<Func<T, object>> OrderBy { get; }
  }
}