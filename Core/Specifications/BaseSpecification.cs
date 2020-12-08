using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Core.Specifications
{
  public class BaseSpecification<T> : ISpecification<T>
  {
    //Criteria is for .Where()
    //Includes is for .Include()
    //For expressions without criteria use empty constructor

    public BaseSpecification(Expression<Func<T, bool>> criteria = null, Expression<Func<T, bool>> first = null)
    {
      if (criteria != null)
      {
        Criteria = criteria;
      }
    }

    public BaseSpecification() { }

    public Expression<Func<T, bool>> Criteria { get; }

    public List<Expression<Func<T, object>>> Includes { get; } = new List<Expression<Func<T, object>>>();

    public Expression<Func<T, object>> OrderBy { get; private set; }

    protected void AddInclude(Expression<Func<T, object>> includeExpression)
    {
      Includes.Add(includeExpression);
    }

    protected void AddOrderBy(Expression<Func<T, object>> orderByExpression)
    {
      OrderBy = orderByExpression;
    }
  }
}